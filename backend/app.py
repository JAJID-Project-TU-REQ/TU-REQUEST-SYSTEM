from fastapi import FastAPI, HTTPException, File, UploadFile, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, StreamingResponse
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorGridFSBucket
from bson.objectid import ObjectId
from fastapi_login import LoginManager
from fastapi_login.exceptions import InvalidCredentialsException
from fastapi.security import OAuth2PasswordRequestForm
from typing import List, Optional
from datetime import datetime
from urllib.parse import quote

#App object
app = FastAPI()

from model import Users, BaseFormModel, ApprovalStatus, ApprovalRequest, Subject

origins = ["http://localhost:3000"] # Replace with your frontend URL

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows specified origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

client = AsyncIOMotorClient("mongodb+srv://keerati:1234@cluster0.me7rp.mongodb.net/")
db = client.TUREQ # Database สำหรับ TUREQ
users_collection = db.users # Collection สำหรับ users
forms_collection = db.forms # Collection สำหรับ forms
subjects_collection = db.subjects # Collection สำหรับ subjects
fs_bucket = AsyncIOMotorGridFSBucket(db)

# Secret key and Login Manager
SECRET = "super-secret-key"
manager = LoginManager(SECRET, token_url="/auth/token")

# test route
@app.get("/")
async def root():
    return {"message":"hello"}

# Login Endpoint
@manager.user_loader
async def load_user(username: str):
    user = await users_collection.find_one({"username": username})  # Use the reference here
    return user

#สำหรับ Login
@app.post("/auth/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await users_collection.find_one({"username": form_data.username})
    if not user or user["password"] != form_data.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Include role in the response token
    access_token = manager.create_access_token(data={"sub": form_data.username, "role": user["role"]})
    return {"access_token": access_token, 
            "token_type": "bearer", 
            "username": user["username"],
            "name_th": user["name_th"],
            "name_en": user["name_en"],
            "role": user["role"], 
            "email": user["email"],
            "advisor": user["advisor"],
            "faculty_en": user["faculty_en"],
            "major_en": user["major_en"],
            "faculty_th": user["faculty_th"],
            "major_th": user["major_th"],
            "room": user["room"]
            }

#สมัครสมาชิก
@app.post("/register")
async def register(user: Users):
    existing_user = await users_collection.find_one({"username": user.username})
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")
    
    new_user = {
        "username": user.username,
        "password": user.password,
        "role": user.role,
        "name_en": user.name_en,
        "name_th": user.name_th,
        "email": user.email,
        "advisor": user.advisor,
        "faculty_en": user.faculty_en,
        "major_en": user.major_en,
        "faculty_th": user.faculty_th,
        "major_th": user.major_th,
        "room": user.room
    }
    await users_collection.insert_one(new_user)
    return {"message": "User registered successfully"}
 
#Create method for form
@app.post("/forms")
async def submit_form(form_data: BaseFormModel):
    # Convert form data to a dictionary and exclude unset fields
    form_data_dict = form_data.dict(exclude_unset=False)

    # Set the current date if it's missing
    if 'date' not in form_data_dict:
        form_data_dict['date'] = datetime.utcnow().strftime('%Y-%m-%d')  # Set current date if missing

    # Store the form in MongoDB
    result = await forms_collection.insert_one(form_data_dict)

    # Add the form ID to the form data after insertion
    form_data_dict["form_id"] = str(result.inserted_id)
    
    # Update the form with the generated form ID
    await forms_collection.update_one({"_id": result.inserted_id}, {"$set": {"form_id": str(result.inserted_id)}})

    # Return the inserted ID as part of the response
    return {"inserted_id": str(result.inserted_id)}

#Create method for add_subject
@app.post("/add_subject")
async def add_subject(subject: str):
    # Check if the subject already exists
    existing_subject = await subjects_collection.find_one({"subject": subject})
    if existing_subject:
        raise HTTPException(status_code=400, detail="Subject already exists")
    
    # Add the subject to the list of available subjects
    result = await subjects_collection.insert_one({"subject": subject})
    return {"message": "Subject added successfully"}

#Read-one form by form_id field
@app.get("/forms/{form_id}")
async def get_form(form_id: str):
    
    # Query the database for the form with the provided form_id
    form = await db["forms"].find_one({"form_id": form_id})

    if form:
        # Convert the MongoDB _id to a string and include in the response
        form["_id"] = str(form["_id"])
        return form
    else:
        # Raise an error if no form is found with the given form_id
        raise HTTPException(status_code=404, detail="Form not found")

#Read-all form
@app.get("/forms")
async def read_all_form():
    forms = []
    cursor = forms_collection.find()
    async for document in cursor:
        document["ObjectId"] = str(document["_id"])
        forms.append(BaseFormModel(**document))
    return forms

@app.post("/approve_form/")
async def approve_form(approval_request: ApprovalRequest):
    try:
        # ค้นหาฟอร์มที่ตรงกับ form_id
        form = await forms_collection.find_one({"form_id": approval_request.form_id})
        
        if not form:
            raise HTTPException(status_code=404, detail="Form not found")

        # ค้นหาตำแหน่งของอาจารย์ใน approval_chain
        approval_chain = form.get("approval_chain", [])
        professor_index = next((index for index, item in enumerate(approval_chain) if item["professor"] == approval_request.professor), -1)
        
        if professor_index == -1:
            raise HTTPException(status_code=404, detail="Professor not found in approval chain")

        # ตรวจสอบสถานะของอาจารย์คนก่อนหน้านี้
        if professor_index > 0:
            previous_approval = approval_chain[professor_index - 1]
            if previous_approval["status"] != ApprovalStatus.approved:
                raise HTTPException(status_code=400, detail="Previous professor has not approved yet")

        # อัปเดต status และ comment ใน approval_chain
        approval_chain[professor_index]["status"] = approval_request.action
        if approval_request.action == ApprovalStatus.disapproved:
            approval_chain[professor_index]["comment"] = approval_request.comment  # เพิ่ม comment เมื่อไม่อนุมัติ
        else:
            approval_chain[professor_index]["comment"] = None  # ลบ comment ถ้าอนุมัติ

        # อัปเดตสถานะของฟอร์ม (ถ้าทุกคนอนุมัติ)
        if all(item["status"] == ApprovalStatus.approved for item in approval_chain):
            form["status"] = ApprovalStatus.approved
        elif any(item["status"] == ApprovalStatus.disapproved for item in approval_chain):
            form["status"] = ApprovalStatus.disapproved

        # อัปเดตข้อมูลในฐานข้อมูล
        await forms_collection.update_one({"form_id": approval_request.form_id}, {"$set": {"approval_chain": approval_chain, "status": form["status"]}})

        return {"message": "Approval status updated successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

#Read-all form query by professor
@app.get("/professor_forms/{professor}", response_model=List[BaseFormModel])
async def get_forms_by_professor(professor: str):
    try:
        # ดึงฟอร์มทั้งหมดที่เกี่ยวข้องกับอาจารย์นี้
        forms = await forms_collection.find({"approval_chain.professor": professor}).to_list(length=100)
        
        if not forms:
            raise HTTPException(status_code=404, detail="No forms found for this professor")

        # กรองฟอร์มที่อนุมัติได้ตามลำดับการอนุมัติ
        filtered_forms = []
        for form in forms:
            # หาตำแหน่งใน approval_chain
            approval_chain = form.get("approval_chain", [])
            professor_index = next((index for index, item in enumerate(approval_chain) if item["professor"] == professor), -1)
            
            if professor_index == -1:
                continue  # ถ้าไม่พบอาจารย์ใน approval_chain ให้ข้ามฟอร์มนี้

            # ตรวจสอบว่าอาจารย์คนก่อนหน้านี้อนุมัติแล้วหรือยัง
            if professor_index > 0:
                previous_approval = approval_chain[professor_index - 1]
                if previous_approval["status"] != ApprovalStatus.approved:
                    continue  # ถ้าคนก่อนหน้านี้ยังไม่อนุมัติ ฟอร์มนี้จะไม่ถูกแสดง

            # ถ้าอาจารย์นี้เป็นอาจารย์คนแรก หรืออนุมัติแล้ว ก็แสดงฟอร์มนี้
            filtered_forms.append(form)

        if not filtered_forms:
            raise HTTPException(status_code=404, detail="No forms found for this professor in the right approval sequence")

        return filtered_forms

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

#ไอดิวลองเขียนดู fetch ฟอร์มที่นักศึกษาส่ง
@app.get("/student_forms/{senderId}", response_model=List[BaseFormModel])
async def get_forms_by_student(senderId: str):
    try:
        forms = await forms_collection.find({"senderId":senderId}).to_list(length=100)
        if not forms:
            raise HTTPException(status_code=404, detail="No forms found for this student")
        return forms
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")   

#fetch ข้อมูลอาจารย์ทั้งหมด
@app.get("/get_professor", response_model=List[Users])
async def get_professor():
    try:
        professors = await users_collection.find({"role":"professor"}).to_list(length=100)
        if not professors:
            raise HTTPException(status_code=404, detail="No professors found")
        return professors
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

#ดึงข้อมูลรหัสวิชาทั้งหมด
@app.get("/get_subjects", response_model=List[Subject])
async def get_subjects():
    try:
        subjects = await subjects_collection.find().to_list(length=100)
        if not subjects:
            raise HTTPException(status_code=404, detail="No subjects found")
        return subjects
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

#หาชื่อผู้ใช้งานจากชื่อจริง
@app.get("/find-user-by-name/{full_name}")
async def find_user_by_name(full_name: str):
    # ค้นหาจากทั้งชื่อภาษาไทยและภาษาอังกฤษ
    user = await users_collection.find_one({
        "$or": [
            {"name_en": full_name},  # ค้นหาจากชื่อภาษาอังกฤษ
            {"name_th": full_name}   # ค้นหาจากชื่อภาษาไทย
        ]
    })
    
    if user:
        return {"username": user["username"]}  # คืนค่าชื่อผู้ใช้งาน
    else:
        raise HTTPException(status_code=404, detail="User not found")

#หาชื่อจริงจากชื่อผู้ใช้งาน
@app.get("/find-name-by-username/{username}")
async def find_name_by_username(username: str):
    # ค้นหาชื่อจากชื่อผู้ใช้งาน
    user = await users_collection.find_one({"username": username})
    if user:
        return {"name_th": user["name_th"]}
    else:
        raise HTTPException(status_code=404, detail="User not found")

#Delete form
@app.delete("/forms/{form_id}")
async def delete_form(form_id):
    response = await forms_collection.delete_one({"_id": ObjectId(form_id)})
    if response:
        return "Successfully deleted form"
    raise HTTPException(404, "error")

#===============================================================================================#

#ฝั่งการอัปโหลดไฟล์ PDF

#Post method for PDF File
@app.post("/pdf")
async def uploadpdf(file: UploadFile = File(...)):
    # ตรวจสอบว่าไฟล์เป็น PDF
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="File type must be PDF")

    # อ่านข้อมูลไฟล์
    file_content = await file.read()

    # ตรวจสอบชื่อไฟล์ซ้ำใน GridFS
    cursor = fs_bucket.find({"filename": file.filename})  # ได้ Cursor
    existing_files = await cursor.to_list(length=1)  # ดึงไฟล์แรกออกมา
    if existing_files:
        # ถ้าชื่อไฟล์ซ้ำ ให้เพิ่ม timestamp ต่อท้าย
        from datetime import datetime
        timestamp = datetime.utcnow().strftime("%Y%m%d%H%M%S")
        unique_filename = f"{file.filename.rsplit('.', 1)[0]}{timestamp}.pdf"
    else:
        unique_filename = file.filename

    # บันทึกไฟล์ลง GridFS
    try:
        pdf_id = await fs_bucket.upload_from_stream(unique_filename, file_content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to upload file: {str(e)}")

    return JSONResponse(content={"file_id": str(pdf_id),
                                "filename": unique_filename,
                                })

#Get method for PDF File query by file_id
@app.get("/pdf/{file_id}")
async def get_pdf(file_id: str):
    # ตรวจสอบว่า _id เป็น ObjectId ที่ถูกต้องหรือไม่
    try:
        file_object_id = ObjectId(file_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid file ID format")

    # ดึงไฟล์จาก GridFS
    try:
        grid_out = await fs_bucket.open_download_stream(file_object_id)
    except Exception:
        raise HTTPException(status_code=404, detail="File not found")

    # เตรียมชื่อไฟล์โดยเข้ารหัสเป็น UTF-8
    filename_encoded = quote(grid_out.filename)

    # ส่งคืนไฟล์ PDF พร้อม header ที่รองรับ Unicode
    return StreamingResponse(
        grid_out,
        media_type="application/pdf",
        headers={
            "Content-Disposition": f"inline; filename*=UTF-8''{filename_encoded}"
        }
    )
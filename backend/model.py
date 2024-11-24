from pydantic import BaseModel, Field
from typing import Literal, Optional, Dict, Any, List
from datetime import datetime
from enum import Enum

class Users(BaseModel):
    username : str
    password : str
    role: Literal['student', 'professor', 'admin']
    name_en : str
    name_th : str
    email : str
    advisor : str
    faculty_en : str
    major_en : str
    faculty_th : str
    major_th : str
    room : str

class Subject(BaseModel):
    subject : str

class ApprovalStatus(str, Enum):
    pending = "pending"
    approved = "approved"
    disapproved = "disapproved"

class ApprovalRequest(BaseModel):
    form_id: str
    professor: str
    action: ApprovalStatus  # "approved" หรือ "disapproved"
    comment: Optional[str] = None  # ใช้เฉพาะกรณีที่ไม่อนุมัติ

class ProfessorApproval(BaseModel):
    professor: str
    status: ApprovalStatus = ApprovalStatus.pending
    approval_order: int
    comment: Optional[str] = None

class BaseFormModel(BaseModel):
    form_id : str = None
    form_type: str
    semester_year: str
    semester: str
    senderId: str
    sender_advisor : str
    status: ApprovalStatus = ApprovalStatus.pending
    approval_chain: List[ProfessorApproval] = []  # List of professors who need to approve
    date: str = Field(default_factory=lambda: datetime.utcnow().strftime('%Y-%m-%d'))
    additional_fields: Dict[str, Any] = {}

class normalForm(BaseFormModel):
    title: str
    content: str
    subject: str
    section: str

class transferGradeForm(BaseFormModel):
    subject1 : str
    subject2 : str
    subject3 : str
    subject4 : str

class PDFModel(BaseModel):
    filename : str
    content_type : str
    size : int
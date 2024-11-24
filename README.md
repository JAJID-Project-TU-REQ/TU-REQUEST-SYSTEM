# TU-REQUEST
สวัสดีครับ ยินดีด้วย คุณได้ clone เว็บที่ดีที่สุดมาแล้ว

ต่อไปจะมาสอน setup โปรเจคหลังจาก clone มาแล้วนะครับ

โดยจะทำแยกฝั่งกันทั้งฝั่ง backend และ frontend นะครับ

## ส่วนของฝั่ง Backend
ในฝั่ง backend จะมีทั้งหมด 4 ขั้นตอนจัฟ โดยทุกขั้นตอนทำใน terminal เดียวกันนะ
ก่อนเริ่มทำ ให้ทำการเข้าไปที่ folder backend ก่อน
โดยการ เปิด terminal แล้วพิมพ์ ```cd backend```
หลังจากนี้ก็ทำขั้นตอนต่อไปได้เลย

#### 1. สร้าง virtual environment
```python
ขั้นตอนสำหรับการสร้าง virtual environment ลงเครื่อง

สำหรับ windows "python -m venv venv"
สำหรับ linux "python3 -m venv venv"
```

#### 2. เปิด virtual environment

```python
ขั้นตอนต่อมาคือ คือเปิด virtual environment

สำหรับ windows ".\venv\Scripts\activate"
สำหรับ linux "source venv/bin/activate"

หากเปิดสำเร็จ จะสังเกตุเห็น (venv) ด้านหน้าตรง tirminal นะครับ
```
### 3. โหลด requirement.txt
```python
หลังจากเปิด virtual environment เสร็จ ก็ลง packgage ที่จำเป็นผ่าน requirement.txt

พิมพ์ "pip install -r requirements.txt"
```

### 4. เปิด server สำหรับ backend

```python
หลังจากทำทุกอย่างเสร็จแล้ว ถึงเวลาเปิด server backend กันนะครับ

พิมพ์ "uvicorn app:app --reload"
แต่ไอดิวให้พิมพ์ "python -m uvicorn app:app --reload"

หากเปิดสำเร็จ ควรจะขึ้น Application startup complete. ใน terminal นะครับ
```

## ส่วนของฝั่ง Frontend

หลังจากเสร็จฝั่ง backend มาต่อฝั่ง frontend กันครับ จะมีทั้งหมด 2 ขั้นตอน
ก่อนเริ่ม ให้เปิด terminal แยกมาอีกอันสำหรับ frontend
หลังจากนั้น เข้าไปที่ folder frontend โดยการ ```cd frontend``` หลังจากนั้น ไปขั้นตอนต่อไปได้เลย

### 1. ติดตั้ง packgage จำเป็นสำหรับ frontend

```python
ขั้นตอนแรก มาติดตั้ง packgage ที่จำเป็นสำหรับ frontend

พิมพ์ "npm install"
```

### 2. เปิด server frontend เลยคร้าบ

```python
หลังจากติดตั้ง packgage เสร็จ ถึงเวลาเปิด server frontend กันเลย

พิมพ์ "npm start"
```

## สรุป

ทุกครั้งหลังจาก clone อย่าลืมมา ลง packgage ให้ backend และ frontend แล้วอย่าลืมเปิด server ด้วยนะครับ ไม่ใช่ลงแต่ packgage เพราะถ้าไม่เปิด server มันก็ทำงานไม่ได้นะครับ ขอบคุณที่อ่านครับ 
import React, { useState, useEffect } from 'react';
import Header from '../components/common/header/Header'
import SubHeader from '../components/common/subheader/SubHeader'
import TopicBox from '../components/common/topicbox/TopicBox'
import SelectSemester from '../components/common/selectsemester/SelectSemester'
import SelectSubject from '../components/common/Select/SelectSubject'
import TextInput from '../components/common/textinput/TextInput'
import SubmitButton from '../components/common/submitbutton/SubmitButton'
import { Box, Toolbar, Radio, FormControlLabel, FormControl, FormLabel, Grid, Typography } from '@mui/material'
import RadioGroup from '@mui/material/RadioGroup';
import FileUpload from '../components/common/fileInput/FileUpload';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Quit() {
  const [form_type] = useState('ลาออก');
  const [semester_year, setSemesterYear] = useState('');
  const [semester, setSemester] = useState('');
  const [senderId, setSenderID] = useState('');
  const [sender_advisor, setSenderAdvisor] = useState('');
  const [advisorId, setAdvisorId] = useState('');
  const [status] = useState('pending');

  // Additional fields
  const [title] = useState('ลาออก');
  const [reason, setReason] = useState('');
  const [parent_approval, setParentApproval] = useState(null);
  const [parent_IDcard, setParentIDCard] = useState(null);
  const [library_approval, setLibraryApproval] = useState(null);

  const form_location = 'http://localhost:8000/forms';
  const file_upload_location = 'http://localhost:8000/pdf';
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem('username');
    const advisor = localStorage.getItem('advisor');
    if (username) {
      setSenderID(username);
    }
    if (advisor) {
      setSenderAdvisor(advisor);
    }
    if (sender_advisor) {
      axios.get(`http://localhost:8000/find-user-by-name/${sender_advisor}`)
        .then(response => {
          setAdvisorId(response.data.username); // เก็บ username ของ advisor
        })
        .catch(error => {
          console.error("Error fetching advisor's username:", error);
        });
    }

  }, [sender_advisor]);

  const approval_chain = [
    { "professor": "admin", "status": "pending", "approval_order": 1, "comment": null },
    { "professor": advisorId, "status": "pending", "approval_order": 2, "comment": null },
    { "professor": "bigp", "status": "pending", "approval_order": 3, "comment": null }
  ]

  // Handle PDF file upload
  const handleFileUpload = async (file) => {
    if (!file) {
      console.warn("No file provided for upload");
      return null;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(file_upload_location, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      // ตรวจสอบว่า response มีข้อมูลที่ต้องการหรือไม่
      if (response.data && response.data.file_id && response.data.filename) {
        console.log("File uploaded successfully:", response.data);
        return {
          file_id: response.data.file_id,
          filename: response.data.filename
        };
      } else {
        console.error("Unexpected response format:", response.data);
        return null;
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('เกิดข้อผิดพลาดในการอัปโหลดไฟล์');
      return null;
    }
  };

  const handleSubmit = async () => {
    const filesToUpload = [
      { file: parent_approval, label: "Parent Approval" },
      { file: parent_IDcard, label: "Parent ID Card" },
      { file: library_approval, label: "Library Approval" }
    ];

    const files = [];
    for (const item of filesToUpload) {
      if (item.file) {
        const uploadedFile = await handleFileUpload(item.file);
        if (uploadedFile) {
          files.push({
            file_id: uploadedFile.file_id,
            file_name: uploadedFile.filename
          });
        }
      }
    }

    const additional_fields = {
      title: title,
      reason: reason,
      file: files

    };

    // Data to be sent to backend, structured for your backend
    const formData = {
      form_type: form_type,
      semester_year: semester_year,
      semester: semester,
      senderId: senderId,
      sender_advisor: sender_advisor,
      status: status,
      approval_chain: approval_chain,
      additional_fields: additional_fields
    };

    // Post request to the backend
    try {
      const response = await axios.post(form_location, formData);
      console.log("Form submitted successfully:", response);
      alert("ส่งคำร้องสำเร็จ");
      navigate('/');
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("เกิดข้อผิดพลาดในการส่งคำร้อง");
    }

  }
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box width={'870px'}>
        <Toolbar />
        <Header text="คำร้องลาออก" />
        <SubHeader />
        <Box sx={{ display: 'flex', justifyContent: 'start ' }}>
          <TopicBox text="ปีการศึกษา" padding="12px" />
          <TextInput label="กรอกปีการศึกษา" onChange={event => setSemesterYear(event.target.value)} />
          <TopicBox text="ภาคการศึกษา" padding="12px" />
          <SelectSemester flexGrow='1' height='55px' onChange={event => setSemester(event.target.value)} />
        </Box>
        <Box>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            onChange={(e) => setReason(e.target.value)}
          >
            <FormControlLabel value="ได้ค่าเฉลี่ยสะสมในภาคเรียนต่ำกว่ามหาวิทยาลัยกำหนด" control={<Radio />} label="ได้ค่าเฉลี่ยสะสมในภาคเรียนต่ำกว่ามหาวิทยาลัยกำหนด" />
            <FormControlLabel value="ศึกษาต่อสถาบันอุดมศึกษาอื่น" control={<Radio />} label="ศึกษาต่อสถาบันอุดมศึกษาอื่น" />
            <FormControlLabel value="อื่นๆ" control={<Radio />} label="อื่นๆ" />
          </RadioGroup>

          <FileUpload
            text="แบบฟอร์มหนังสือรับรองจากผู้ปกครอง"
            onChange={(e) => setParentApproval(e.target.files[0])}
          />
          <FileUpload
            text="สำเนาบัตรประชาชนผู้ปกครอง"
            onChange={(e) => setParentIDCard(e.target.files[0])}
          />
          <FileUpload
            text="แบบฟอร์มหนังสือรับรองจากห้องสมุดคณะฯ"
            onChange={(e) => setLibraryApproval(e.target.files[0])}
          />

        </Box>
        <Box>
          <SubmitButton onClick={handleSubmit} />
        </Box>
      </Box>
    </Box>
  )
}
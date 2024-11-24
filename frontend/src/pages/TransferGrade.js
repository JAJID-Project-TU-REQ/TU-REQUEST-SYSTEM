import React, { useState, useEffect } from 'react';
import Header from '../components/common/header/Header'
import SubHeader from '../components/common/subheader/SubHeader'
import TopicBox from '../components/common/topicbox/TopicBox'
import SelectSemester from '../components/common/selectsemester/SelectSemester'
import SelectSubject from '../components/common/Select/SelectSubject'
import TextInput from '../components/common/textinput/TextInput'
import SubmitButton from '../components/common/submitbutton/SubmitButton'
import FileUpload from '../components/common/fileInput/FileUpload';
import { Box, Toolbar } from '@mui/material'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function TransferGrade() {
  
    // Common fields
    const [form_type] = useState('เทียบโอนรายวิชา(มหาวิทยาลัยอื่น)');
    const [semester_year, setSemesterYear] = useState('');
    const [semester, setSemester] = useState('');
    const [senderId, setSenderID] = useState('');
    const [sender_advisor, setSenderAdvisor] = useState('');
    const [status] = useState('pending');

    // Additional fields
    const [title] = useState('เทียบโอนรายวิชา(มหาวิทยาลัยอื่น)');
    const [subject1, setSubject1] = useState(''); 
    const [subject2, setSubject2] = useState('');
    const [subject3, setSubject3] = useState('');
    const [subject4, setSubject4] = useState('');
    const [file, setFile] = useState(null);

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
    }, []);

    const handleFileUpload = async () => {
      if (!file) return null;
  
      const formData = new FormData();
      formData.append('file', file);
  
      try {
        const response = await axios.post(file_upload_location, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('เกิดข้อผิดพลาดในการอัปโหลดไฟล์');
        return null;
      }
    };

    const approval_chain = [
      {"professor": "admin", "status": "pending", "approval_order": 1, "comment": null}
  ]

    const handleSubmit = async () => {

      let uploadedFileData = null;
    if (file) {
      uploadedFileData = await handleFileUpload(); // Upload file if it exists
      if (!uploadedFileData) return; // Stop submission if file upload fails
    }
    
    const files = [
      {
        ...(uploadedFileData && {
          file_id: uploadedFileData.file_id,
          file_name: uploadedFileData.filename
        })
      }
    ]

      const additional_fields = {
        title : title,
        subject1: subject1,
        subject2: subject2,
        subject3: subject3,
        subject4: subject4,
        file : files
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
      axios.post(form_location, formData)
      .then(res => {
        console.log("Form submitted successfully:", res);
        alert("ส่งคำร้องสำเร็จ"); // Success alert
        navigate('/');
      })
      .catch(err => {
        console.error("Error posting form data:", err);
        alert("เกิดข้อผิดพลาดในการส่งคำร้อง");
      });
      
    }
  return (
    <Box sx={{display: 'flex', justifyContent: 'center'}}>
      <Box width={'870px'}>
      <Toolbar/>
          <Header text="คำร้องเทียบโอนรายวิชา"/>
          <SubHeader/>
        <Box  sx={{display: 'grid', gap: 1, gridTemplateColumns: 'repeat(2, 1fr)',width:'100%'}}>     
          <Box sx={{display: 'flex'}}>
          <TopicBox text="ปีการศึกษา" padding="14px 10px"  />
          <TextInput label="กรอกปีการศึกษา" flexGrow = '1' onChange={event => setSemesterYear(event.target.value)} />
          </Box>
          <Box sx={{display: 'flex'}}>
          <TopicBox text="ภาคการศึกษา"  padding="14px 10px"/>
          <SelectSemester flexGrow='1'  onChange={event => setSemester(event.target.value)}/>
          </Box>
          <Box sx={{display: 'flex'}}>
          <TopicBox text="รหัสวิชา"  padding="14px 10px"/>
          <SelectSubject flexGrow = '1'   onChange={event => setSubject1(event.target.value)} />
          </Box>
          <Box sx={{display: 'flex'}}>
          <TopicBox text="รหัสวิชา" padding="14px 10px"/>
          <SelectSubject flexGrow = '1'onChange={event => setSubject2(event.target.value)}/>
          </Box>
          <Box sx={{display: 'flex'}}>
          <TopicBox text="รหัสวิชา" padding="14px 10px"/>
          <SelectSubject flexGrow = '1'onChange={event => setSubject3(event.target.value)}/>
          </Box>
          <Box sx={{display: 'flex'}}>
          <TopicBox text="รหัสวิชา" padding="14px 10px"/>
          <SelectSubject flexGrow = '1' onChange={event => setSubject4(event.target.value)}/>
          </Box>
        </Box>
        <Box sx={{mt:2,display: 'flex'}}>
            <FileUpload 
            text="แนบผลการศึกษาจากมหาวิทยาลัยเดิม" 
            flexGrow = '1'
            onChange={(e) => setFile(e.target.files[0])}/>
          </Box>
        <Box >
          <SubmitButton onClick={handleSubmit}/>
        </Box>
      </Box>
    </Box>
      
  )
}

export default TransferGrade

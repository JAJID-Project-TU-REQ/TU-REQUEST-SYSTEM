import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Select, MenuItem, TextField, Container, Button } from '@mui/material';
import axios from 'axios';
import SelectProf from '../components/common/Select/SelectProf';
import { useNavigate } from 'react-router-dom';
import SelectSubject from '../components/common/Select/SelectSubject';

function NormalRequest() {
  // Common fields
  const [form_type] = useState('ทั่วไป');
  const [semester_year, setSemesterYear] = useState('');
  const [semester, setSemester] = useState('');
  const [senderId, setSenderID] = useState('');
  const [sender_advisor, setSenderAdvisor] = useState('');
  const [status] = useState('pending');

  // Additional fields
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [subject, setSubject] = useState('');
  const [section, setSection] = useState('');
  const [professor, setProf] = useState('');
  const [file, setFile] = useState(null);

  const form_location = 'https://tu-request-backend.onrender.com/forms';
  const file_upload_location = 'https://tu-request-backend.onrender.com/pdf';

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

  const approval_chain = [
    {"professor": "admin", "status": "pending", "approval_order": 1, "comment": null},
    {"professor": professor, "status": "pending", "approval_order": 2, "comment": null},
    {"professor": "bigp", "status": "pending", "approval_order": 3, "comment": null}
]

  // Handle PDF file upload
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

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

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
      title: title,
      content: content,
      subject: subject,
      section: section,
      file : files
    };

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

    try {
      const response = await axios.post(form_location, formData);
      console.log("Form submitted successfully:", response);
      alert("ส่งคำร้องสำเร็จ");
      navigate('/');
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("เกิดข้อผิดพลาดในการส่งคำร้อง");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 14, mb: 5 }}>
      <Grid container sx={{ textAlign: 'center', borderBottom: 2, borderColor: 'divider', pb: 4}}>
        <Grid item xs={12}>
          <Typography variant='h4' sx={{fontWeight: 600}}>คำร้องทั่วไป</Typography>
        </Grid>
      </Grid>

      {/* Subtitle Section */}
      <Grid container sx={{ mt: 5, textAlign: 'center', pb: 4 }}>
        <Grid item xs={12}>
          <Typography variant='h5'>กรอกข้อมูลคำร้อง</Typography>
          <Typography variant='h6'>โปรดกรอกข้อมูลให้ถูกต้องและครบถ้วนเพื่อความรวดเร็วในการดำเนินการ</Typography>
        </Grid>
      </Grid>

      {/* Form Section */}
      <Grid container spacing={3}>
        {/* Year and Semester Fields */}
        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            <Typography variant='h6' sx={{ mr: 2, backgroundColor: "#902923", borderRadius: '8px', padding: '8px 18px', color: '#FFFFFF' }}>
              ปีการศึกษา
            </Typography>
            <TextField id="semester_year" label="กรอกปีการศึกษา" variant="outlined" onChange={event => setSemesterYear(event.target.value)} sx={{ borderRadius:5,ml: 2, flexGrow: 1 }} />

            <Typography variant='h6' sx={{ borderRadius:5,ml: 4, mr: 2, backgroundColor: "#902923", borderRadius: '8px', padding: '8px 18px', color: '#FFFFFF' }}>
              ภาคการศึกษา
            </Typography>
            <Select id="semester" name="semester" variant="outlined" onChange={event => setSemester(event.target.value)} sx={{ borderRadius:5,width: '150px', height: '50px' }}>
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="summer">summer</MenuItem>
            </Select>
          </Box>
        </Grid>

        {/* Request Title Field */}
        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            <Typography variant='h6' sx={{ mr: 2, backgroundColor: "#902923", borderRadius: '8px', padding: '8px 18px', color: '#FFFFFF' }}>
              หัวข้อคำร้อง
            </Typography>
            <TextField id="title" label="กรอกหัวข้อคำร้อง" variant="outlined" onChange={event => setTitle(event.target.value)} fullWidth sx={{ borderRadius:5,ml: 2 }} />
          </Box>
        </Grid>

        {/* Request Content Field */}
        <Grid item xs={12}>
          <Box display="flex" alignItems="flex-start">
            <Typography variant='h6' sx={{ mr: 2, backgroundColor: "#902923", borderRadius: '8px', padding: '30px 18px', color: '#FFFFFF' }}>
              ความประสงค์
            </Typography>
            <TextField
              id="content"
              label="กรอกความประสงค์"
              variant="outlined"
              onChange={event => setContent(event.target.value)}
              multiline
              rows={4}
              fullWidth
              sx={{ borderRadius:5,ml: 2 }}
            />
          </Box>
        </Grid>

        {/* Professor Field */}
        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            <Typography variant='h6' sx={{ mr: 2, backgroundColor: "#902923", borderRadius: '8px', padding: '8px 18px', color: '#FFFFFF' }}>
              อาจารย์ผู้สอน
            </Typography>
            <SelectProf onChange={event => setProf(event.target.value)}/>
              <Box width='50px'></Box>
            <Typography variant='h6' sx={{ mr: 2, backgroundColor: "#902923", borderRadius: '8px', padding: '8px 18px', color: '#FFFFFF' }}>
              รหัสวิชา
            </Typography>
            <SelectSubject onChange={event => setSubject(event.target.value)}/>
          </Box>
        </Grid>

        {/* Subject and Section Fields */}
          <Box display="flex" alignItems="center" alignContent='start' sx={{mt: 2}}>

            <Typography variant='h6' sx={{ ml: 3, mt: 2, backgroundColor: "#902923", borderRadius: '8px', padding: '8px 18px', color: '#FFFFFF' }}>
              กลุ่มเรียนที่ศึกษา
            </Typography>
            <TextField id="section" label="กรอกกลุ่มเรียน (Section)" variant="outlined" onChange={event => setSection(event.target.value)} sx={{mt:2, borderRadius:5,ml: 2, flexGrow: 1 }} />
          </Box>
        
        {/* File Upload */}
        <Grid item xs={12} sx={{ mt: 3 }}>
          <Typography variant="h6">แนบไฟล์ PDF (ถ้ามี)</Typography>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12} sx={{ mt: 5, textAlign: 'center' }}>
          <Button variant="contained" onClick={handleSubmit} sx={{ mb: 7, width: 150, height: 50, borderRadius: 8 }}>Submit</Button>
          <Typography variant='h6' sx={{ color: '#E1003C' }}>คำร้องที่ถูกบันทึกและส่งจะไม่สามารถแก้ไขได้ กรุณาตรวจสอบข้อมูลก่อนบันทึก</Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default NormalRequest;

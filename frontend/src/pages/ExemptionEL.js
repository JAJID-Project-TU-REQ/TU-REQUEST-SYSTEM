import React, { useState, useEffect } from "react";
import SubmitButton from "../components/common/submitbutton/SubmitButton";
import { Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";

function ExemptionEL() {
  // Common fields
  const [form_type] = useState("เทียบโอนรายวิชา(วิชาภาษาอังกฤษ)");
  const [semester_year, setSemesterYear] = useState("");
  const [semester, setSemester] = useState("");
  const [senderId, setSenderID] = useState("");
  const [sender_advisor, setSenderAdvisor] = useState('');
  const [status] = useState("pending");

  // Additional fields
  const [content, setContent] = useState('');
  const title = "เทียบโอนรายวิชา(วิชาภาษาอังกฤษ)";
  const subject = "EL105";
  const [file, setFile] = useState(null);

  const form_location = "http://localhost:8000/forms";
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

  const approval_chain = [
    {"professor": "admin", "status": "pending", "approval_order": 1, "comment": null}
]

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
      subject: subject,
      content: content,
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
      additional_fields: additional_fields,
    };

    try {
      const response = await axios.post(form_location, formData);
      console.log("Form submitted successfully:", response);
      alert("ส่งคำร้องสำเร็จ");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("เกิดข้อผิดพลาดในการส่งคำร้อง");
    }

    navigate("/");
  };
  return (
    <Container maxWidth="md" sx={{ mt: 14, mb: 5 }}>
      <Grid
        container
        sx={{
          textAlign: "center",
          borderBottom: 2,
          borderColor: "divider",
          pb: 4,
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            คำร้องยื่นผลขอยกเว้นรายวิชา EL
          </Typography>
          <Typography variant="h5">วิชาภาษาอังกฤษ (วิชา EL)</Typography>
        </Grid>
      </Grid>

      {/* Subtitle Section */}
      <Grid container sx={{ mt: 5, textAlign: "center", pb: 4 }}>
        <Grid item xs={12}>
          <Typography variant="h5">กรอกข้อมูลคำร้อง</Typography>
          <Typography variant="h6">
            โปรดกรอกข้อมูลให้ถูกต้องและครบถ้วนเพื่อความรวดเร็วในการดำเนินการ
          </Typography>
        </Grid>
      </Grid>
      {/* Semester Placing */}
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <Typography
                variant="h6"
                sx={{
                  mr: 2,
                  backgroundColor: "#902923",
                  borderRadius: "8px",
                  padding: "8px 18px",
                  color: "#FFFFFF",
                }}
              >
                ปีการศึกษา
              </Typography>
              <TextField
                id="semester_year"
                label="กรอกปีการศึกษา"
                variant="outlined"
                onChange={(event) => setSemesterYear(event.target.value)}
                sx={{ borderRadius: 5, ml: 2, flexGrow: 1 }}
              />

              <Typography
                variant="h6"
                sx={{
                  ml: 4,
                  mr: 2,
                  backgroundColor: "#902923",
                  borderRadius: "8px",
                  padding: "8px 18px",
                  color: "#FFFFFF",
                }}
              >
                ภาคการศึกษา
              </Typography>
              <Select
                id="semester"
                name="semester"
                variant="outlined"
                onChange={(event) => setSemester(event.target.value)}
                sx={{ borderRadius: 5, width: "150px", height: "50px" }}
              >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="summer">summer</MenuItem>
              </Select>
            </Box>
          </Grid>
          <Grid item xs={12}>

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
   
            {/* ผลการสอบ TU Upload */}
            <Grid item xs={12} sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                แนบไฟล์ผลคะแนนการสอบ TU-GET/TOEFL/IELTS (PDF)
              </Typography>
              <Box
                sx={{
                  mt: 1,
                  padding: "16px 6px",
                  border: "1px dashed grey",
                  borderRadius: 4,
                }}
              >
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </Box>
            </Grid>
            <Box>
              <SubmitButton onClick={handleSubmit} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default ExemptionEL;

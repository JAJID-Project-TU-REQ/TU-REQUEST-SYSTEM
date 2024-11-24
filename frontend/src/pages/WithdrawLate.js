import React, { useState, useEffect } from "react";
import SubmitButton from "../components/common/submitbutton/SubmitButton";
import { Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SelectProf from '../components/common/Select/SelectProf';
import {
  Container,
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";

function WithdrawLate() {
  // Common fields
  const [form_type] = useState("ถอนวิชาล่าช้ากรณีพิเศษ");
  const [semester_year, setSemesterYear] = useState("");
  const [semester, setSemester] = useState("");
  const [senderId, setSenderID] = useState("");
  const [sender_advisor, setSenderAdvisor] = useState('');
  const [status] = useState("pending");

  // Additional fields
  const [content, setContent] = useState('');
  const title = "ถอนวิชาล่าช้ากรณีพิเศษ";
  const [professor, setProf] = useState('');
  const [professorName, setProfName] = useState('');
  const [section, setSection] = useState('');
  const [subject, setSubject] = useState('');

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
    if (professor) {
      axios.get(`http://localhost:8000/find-name-by-username/${professor}`)
        .then(response => {
          setProfName(response.data.name_th); // เก็บ username ของ advisor
        })
        .catch(error => {
          console.error("Error fetching professor's name", error);
        });
    }
  }, [professor]);

  const approval_chain = [
    {"professor": "admin", "status": "pending", "approval_order": 1, "comment": null},
    {"professor": professor, "status": "pending", "approval_order": 2, "comment": null},
    {"professor": "bigp", "status": "pending", "approval_order": 3, "comment": null}
  ]

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const additional_fields = {
      title: title,
      content: content,
      subject: subject,
      section: section,
      professor: professorName
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
            คำร้องถอนวิชาล่าช้ากรณีพิเศษ
          </Typography>
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

        {/* Subject and Section Fields */}
        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            <Typography variant='h6' sx={{ mt:2 ,mr: 2, mb:2, backgroundColor: "#902923", borderRadius: '8px', padding: '8px 18px', color: '#FFFFFF' }}>
              รหัสวิชา
            </Typography>
            <Select id="subject" name="subject" variant="outlined" onChange={event => setSubject(event.target.value)} sx={{ mt:2, mb:2, borderRadius:5,width: '150px', height: '50px' }}>
              <MenuItem value="CN101">CN101</MenuItem>
              <MenuItem value="SF221">SF221</MenuItem>
              <MenuItem value="SF212">SF212</MenuItem>
            </Select>

            <Typography variant='h6' sx={{ ml: 4, mr: 2, backgroundColor: "#902923", borderRadius: '8px', padding: '8px 18px', color: '#FFFFFF' }}>
              กลุ่มเรียนที่ศึกษา
            </Typography>
            <TextField id="section" label="Section" variant="outlined" onChange={event => setSection(event.target.value)} sx={{ borderRadius:5,ml: 2, flexGrow: 1 }} />
          </Box>
        </Grid>

        {/* Professor Field */}
        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            <Typography variant='h6' sx={{ mr: 2, backgroundColor: "#902923", borderRadius: '8px', padding: '8px 18px', color: '#FFFFFF' }}>
              อาจารย์ผู้สอน
            </Typography>
            <SelectProf onChange={event => setProf(event.target.value)} />
            <Typography variant='h6' sx={{ ml: 4, mr: 2, backgroundColor: "#902923", borderRadius: '8px', padding: '8px 18px', color: '#FFFFFF' }}>
              ระบุชื่ออาจารย์
            </Typography>
            <TextField id="section" label="กรณีที่เป็นอาจารย์ภายนอก" variant="outlined" onChange={event => setSection(event.target.value)} sx={{ borderRadius:5,ml: 2, flexGrow: 1 }} />
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

export default WithdrawLate;

import React from "react";
import { useEffect, useState } from "react";
import { Box, Tabs, Tab, Typography, Grid, Toolbar } from "@mui/material";
import PropTypes from "prop-types";
import ArticleIcon from "@mui/icons-material/Article";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { TableContainer, TableHead, TableRow, TableCell, TableBody, ButtonGroup, Button } from "@mui/material";
import Footer from "../components/footer";
import { Link } from "react-router-dom";
import StudentForms from "../method/StudentForms";


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};



export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [studentUsername, setStudentUsername] = useState("");
  const { forms, loading, error } = StudentForms(studentUsername);

  const pendingForms = forms?.filter((form) => form.status === "pending") || [];
  const successForms = forms?.filter((form) => form.status !== "pending") || [];


  useEffect(() => {
    const storedStudentUsername = localStorage.getItem("username");
    if (storedStudentUsername) {
      setStudentUsername(storedStudentUsername);
    }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Toolbar />
      <Box >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          สถานะคำร้อง
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          REQUEST STATUS
        </Typography>
      </Box>
      <Box sx={{ width: '100%', }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", width: '100%', }}>
          <Tabs value={value} onChange={handleChange} centered sx={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
            <Tab
              icon={<ArticleIcon />}
              iconPosition=""
              label="คำร้องทั้งหมด"
            />
            <Tab
              icon={<EditNoteIcon />}
              iconPosition=""
              label="อยู่ระหว่างการดำเนินงาน"
            />
            <Tab
              icon={<CheckCircleOutlineIcon />}
              iconPosition=""
              label="คำร้องเสร็จสิ้นแล้ว"
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <TableContainer sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <TableHead>
              <TableRow sx={{ display: 'flex', width: '100%' }}>
                <TableCell align="center" sx={{ py: 0.5, width: "100%" }}>วันที่</TableCell>
                <TableCell align="center" sx={{ py: 0.5, width: "100%" }}>ประเภท</TableCell>
                <TableCell align="center" sx={{ py: 0.5, width: "100%" }}>หัวข้อคำร้อง</TableCell>
                <TableCell align="center" sx={{ py: 0.5, width: "100%" }}>รายละเอียด</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading && <TableRow><TableCell colSpan={4}>Loading...</TableCell></TableRow>}
              {error && <TableRow><TableCell colSpan={4}>{error}</TableCell></TableRow>}
              {forms.length > 0 ? (
                forms.sort((a, b) => new Date(b.date) - new Date(a.date)).map((form) => (
                  console.log(form.date),
                  <TableRow sx={{ display: 'flex', width: '100%' }}>
                    <TableCell align="center" sx={{ py: 0.5, width: "100%" }}>{form.date}</TableCell>
                    <TableCell align="center" sx={{ py: 0.5, width: "100%" }}>{form.form_type}</TableCell>
                    <TableCell align="center" sx={{ py: 0.5, width: "100%" }}>{form.additional_fields.title}</TableCell>
                    <TableCell align="center" sx={{ py: 0.5, width: "100%" }}>
                      <Button component={Link} to={`student-detail/${form.form_id}`} >รายละเอียด</Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow sx={{ display: 'flex', width: '100%' }}>
                  <TableCell align="" sx={{ py: 0.5, flexGrow: 1 }}>No forms found for this student.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </TableContainer>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
        <TableContainer sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <TableHead>
              <TableRow sx={{ display: 'flex', width: '100%' }}>
                <TableCell align="center" sx={{ py: 0.5, width: "100%" }}>วันที่</TableCell>
                <TableCell align="center" sx={{ py: 0.5, width: "100%" }}>ประเภท</TableCell>
                <TableCell align="center" sx={{ py: 0.5, width: "100%" }}>หัวข้อคำร้อง</TableCell>
                <TableCell align="center" sx={{ py: 0.5, width: "100%" }}>รายละเอียด</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading && <TableRow><TableCell colSpan={4}>Loading...</TableCell></TableRow>}
              {error && <TableRow><TableCell colSpan={4}>{error}</TableCell></TableRow>}
              {pendingForms.length > 0 ? (
                pendingForms.sort((a, b) => new Date(b.date) - new Date(a.date)).map((form) => (
                  console.log(form.date),
                  <TableRow sx={{ display: 'flex', width: '100%' }}>
                    <TableCell align="center" sx={{ py: 0.5, width: "100%" }}>{form.date}</TableCell>
                    <TableCell align="center" sx={{ py: 0.5, width: "100%" }}>{form.form_type}</TableCell>
                    <TableCell align="center" sx={{ py: 0.5, width: "100%" }}>{form.additional_fields.title}</TableCell>
                    <TableCell align="center" sx={{ py: 0.5, width: "100%" }}>
                      <Button component={Link} to={`student-detail/${form.form_id}`} >รายละเอียด</Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow sx={{ display: 'flex', width: '100%' }}>
                  <TableCell align="" sx={{ py: 0.5, flexGrow: 1 }}>No forms found for this student.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </TableContainer>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
        <TableContainer sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <TableHead>
              <TableRow sx={{ display: 'flex', width: '100%' }}>
                <TableCell align="center" sx={{ py: 0.5, width: "100%" }}>วันที่</TableCell>
                <TableCell align="center" sx={{ py: 0.5, width: "100%" }}>ประเภท</TableCell>
                <TableCell align="center" sx={{ py: 0.5, width: "100%" }}>หัวข้อคำร้อง</TableCell>
                <TableCell align="center" sx={{ py: 0.5, width: "100%" }}>รายละเอียด</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading && <TableRow><TableCell colSpan={4}>Loading...</TableCell></TableRow>}
              {error && <TableRow><TableCell colSpan={4}>{error}</TableCell></TableRow>}
              {successForms.length > 0 ? (
                successForms.sort((a, b) => new Date(b.date) - new Date(a.date)).map((form) => (
                  console.log(form.date),
                  <TableRow sx={{ display: 'flex', width: '100%' }}>
                    <TableCell align="center" sx={{ py: 0.5, width: "100%" }}>{form.date}</TableCell>
                    <TableCell align="center" sx={{ py: 0.5, width: "100%" }}>{form.form_type}</TableCell>
                    <TableCell align="center" sx={{ py: 0.5, width: "100%" }}>{form.additional_fields.title}</TableCell>
                    <TableCell align="center" sx={{ py: 0.5, width: "100%" }}>
                      <Button component={Link} to={`student-detail/${form.form_id}`} >รายละเอียด</Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow sx={{ display: 'flex', width: '100%' }}>
                  <TableCell align="" sx={{ py: 0.5, flexGrow: 1 }}>No forms found for this student.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </TableContainer>
        </CustomTabPanel>
        <Footer />
      </Box>
    </Box>
  );
}


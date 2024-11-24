import React, { useEffect, useState } from "react";
import { Container, Paper, Typography, Grid, Button, Box, Toolbar, TextField } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import FormDetails from "../method/formDetails";
import axios from "axios";
import NormalRequestDetail from "../components/DetailComponents/NormalRequestDetail/NormalRequestDetail";
import TransferGradeDetail from "../components/DetailComponents/TransferGradeDetail/TransferGradeDetail";
import ExemptionTUDetail from "../components/DetailComponents/ExemptionTUDetail/ExemptionTUDetail";
import QuitDetail from "../components/DetailComponents/QuitDetail/QuitDetail";
import RegisAndWithdarw from "../components/DetailComponents/LateRegisandWithdraw/RegisAndWithdraw";

export default function Detail() {
  const { form_id } = useParams(); // Extract the formId from the URL
  const { form, loading, error } = FormDetails(form_id);
  const [Role, setRole] = useState("");
  const [comment, setComment] = useState("");

  const navigate = useNavigate();

  const checkButton = () => {
    const username = localStorage.getItem("username");
    const currentApproval = form.approval_chain.find(
      (entry) => entry.professor === username
    );
    return currentApproval.status === "pending";
  };

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  console.log("Form ID from URL:", form_id); // Check if formId is being retrieved
  console.log("Form Details:", form); // Check if form is being retrieved

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleViewPDF = (file_id) => {
    window.open(`http://localhost:8000/pdf/${file_id}`, "_blank");
  };

  const handleApproval = async (action) => {
    if (Role === "professor" || Role === "admin") {
      try {
        const approvalData = {
          form_id: form.form_id,
          professor: localStorage.getItem("username"),
          action: action,
          comment: action === "disapproved" ? comment : null,
        };

        const response = await axios.post("http://localhost:8000/approve_form/", approvalData);

        if (response.data.message) {
          alert("การอัปเดตสถานะคำร้องสำเร็จ");
          navigate("/");
        }
      } catch (error) {
        console.error("Error approving form:", error);
        alert("เกิดข้อผิดพลาดในการอนุมัติคำร้อง");
      }
    }
  };

  const renderFormDetail = () => {
    switch (form.form_type) {
      case "ทั่วไป":
        return <NormalRequestDetail form={form} />
      case "ลาออก":
        return <QuitDetail form={form} />
      case "เทียบโอนรายวิชา(TU)":
        return <ExemptionTUDetail form={form} />
      case "เทียบโอนรายวิชา(วิชาภาษาอังกฤษ)":
        return <NormalRequestDetail form={form} />
      case "เทียบโอนรายวิชา(มหาวิทยาลัยอื่น)":
        return <TransferGradeDetail form={form} />
      case "เทียบโอนรายวิชา(E-Learning)":
        return <ExemptionTUDetail form={form} />
      case "จดทะเบียนวิชาล่าช้ากรณีพิเศษ":
        return <RegisAndWithdarw form={form} />//
      case "ถอนวิชาล่าช้ากรณีพิเศษ":
        return <RegisAndWithdarw form={form} />//
      default:
        return <h1>ควย</h1>
    }
  }

  const getStatusBox = () => {
    let bgColor = "#FFC107"; // Default: pending
    let text = "รอการอนุมัติ";

    if (form.status === "approved") {
      bgColor = "#1a9d0e"; // Green for approved
      text = "อนุมัติ";
    } else if (form.status === "disapproved") {
      bgColor = "#d32f2f"; // Red for disapproved
      text = "ไม่อนุมัติ";
    }

    return (
      <Box
        sx={{
          backgroundColor: bgColor,
          borderRadius: "42px",
          boxShadow: "none",
          px: 2,
          py: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <Typography sx={{ color: "white", fontWeight: "bold" }}>{text}</Typography>
      </Box>
    );
  };

  return (
    <>
      <Container>
        <Toolbar />
        <Box sx={{ width: "100%", maxWidth: "1200px", mx: "auto" }}>
          <Box
            sx={{
              mt: 4.9,
              mb: 3,
              width: "100%",
              height: "20%",
              textAlign: "center",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              รายละเอียดคำร้อง
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              REQUEST DETAIL
            </Typography>
          </Box>
          <Box sx={{ width: "100%", height: "70%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}></Box>
          </Box>
        </Box>
        <Box sx={{ width: "100%", maxWidth: "1200px", mx: "auto" }}>
          <Box
            sx={{
              mt: 2,
              mb: 2,
              width: "100%",
              height: "20%",
              textAlign: "left",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box display={"flex"}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                หัวข้อคำร้อง:
              </Typography>
              <Typography variant="h6" sx={{ ml: 1, fontWeight: "bold" }}>
                {form.additional_fields.title}
              </Typography>
            </Box>
            {getStatusBox()}
          </Box>
          <Box sx={{ width: "100%", height: "70%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}></Box>
          </Box>
        </Box>
        <Paper elevation={0} sx={{ p: 4 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Grid container spacing={3}>
              <Grid display={"flex"} item xs={12} sm={6}>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom sx={{ fontSize: "1.1rem" }}>
                  เขียนวันที่ :
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: "1.1rem", ml: 1 }}>
                  {form.date}
                </Typography>
              </Grid>
              <Grid display={"flex"} item xs={12} sm={6}>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom sx={{ fontSize: "1.1rem" }}>
                  อาจารย์ที่ปรึกษา :
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: "1.1rem" }}>
                  {form.sender_advisor}
                </Typography>
              </Grid>
            </Grid>

            <Box display={"flex"}>
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom sx={{ fontSize: "1.1rem" }}>
                ประเภทคำร้อง :
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1, fontSize: "1.1rem" }}>
                {form.form_type}
              </Typography>
            </Box>

            {/* <Box display={"flex"}>
              <Box sx={{ width: "15%", mr: 0 }}>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom sx={{ fontSize: "1.1rem" }}>
                  คำอธิบายประกอบ :
                </Typography>
              </Box>
              <Box
                sx={{
                  ml: 0,
                  width: "88%",
                  maxHeight: "200px",
                  overflow: "auto",
                  whiteSpace: "pre-wrap",
                  wordWrap: "break-word",
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ whiteSpace: "pre-line", fontSize: "1.1rem" }}
                >
                  {form.additional_fields.content}
                </Typography>
              </Box>
            </Box> */}
            {renderFormDetail()}

            {form.additional_fields.file &&
              Array.isArray(form.additional_fields.file) &&
              form.additional_fields.file.length > 0 ? (
              form.additional_fields.file.map((file, index) => (
                <Box key={index} sx={{ display: "flex", alignItems: "center" }} gap={2}>
                  <Typography fontWeight="bold" sx={{ fontSize: "1.1rem" }}>
                    ไฟล์แนบประกอบ:
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: "1.1rem" }}>
                    {file.file_name}
                  </Typography>
                  <Button
                    variant="text"
                    size="small"
                    sx={{
                      color: "primary.main",
                      textTransform: "none",
                      fontSize: "1.1rem",
                    }}
                    onClick={() => handleViewPDF(file.file_id)}
                  >
                    (VIEW PDF)
                  </Button>
                </Box>
              ))
            ) : (
              <Typography color="text.secondary" sx={{ fontSize: "1.1rem", mt: 2 }}>
                ไม่มีไฟล์แนบ
              </Typography>
            )}

           
            {((Role === "professor" || Role === "admin") && checkButton()) && (
              <Box sx={{ display: "flex", gap: 2, mt: 2, flexGrow: 1 }}>
                 <TextField
              label="Comment (จำเป็นเมื่อไม่อนุมัติ)"
              variant="outlined"
              sx={{ display: 'flex', flexGrow: 5 }}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              multiline
              rows={3}
            />
            <Box sx={{display: 'felx',   alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                <Button
                  sx={{
                    borderRadius: "42px",
                    boxShadow: "none",
                    px: 1,
                    py: 1,
                    mt:8,
                    mr:1
                  }}
                  variant="contained"
                  color="error"
                  onClick={() => {
                    if (!comment.trim()) {
                      alert("กรุณาใส่เหตุผลในช่อง Comment ก่อนกดไม่อนุมัติ");
                      return;
                    }
                    handleApproval("disapproved");
                  }}
                >
                  ไม่อนุมัติ
                </Button>
                <Button
                  sx={{
                    borderRadius: "42px",
                    boxShadow: "none",
                    px: 2,
                    py: 1,
                    mt:8
                  }}
                  variant="contained"
                  color="success"
                  onClick={() => handleApproval("approved")}
                >
                  อนุมัติ
                </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Paper>
      </Container>
    </>
  );
}

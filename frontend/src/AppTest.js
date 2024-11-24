import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ButtonGroup,
  Tabs,
  Tab,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import ProfessorForms from "./method/ProfessorForms";

const AppTest = () => {
  const { form_type } = useParams();
  const [professorUsername, setProfessorUsername] = useState("");
  const [tabValue, setTabValue] = useState(0); // State to handle tab selection

  useEffect(() => {
    const storedProfessorUsername = localStorage.getItem("username");
    if (storedProfessorUsername) {
      setProfessorUsername(storedProfessorUsername);
    }
  }, []);

  const { forms: fetchedForms, loading, error } = ProfessorForms(professorUsername);

  // Filter pending and completed forms
  const allPendingForms = fetchedForms?.filter(
    (form) =>
      form.approval_chain.some(
        (entry) => entry.professor === professorUsername && entry.status === "pending"
      )
  ) || [];

  const allCompletedForms = fetchedForms?.filter(
    (form) =>
      form.approval_chain.some(
        (entry) =>
          entry.professor === professorUsername &&
          (entry.status === "approved" || entry.status === "disapproved")
      )
  ) || [];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div>
      <Toolbar />
      <Container sx={{ p: 2 }} maxWidth="lg">
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          sx={{ mb: 2 }}
        >
          <Tab label="คำร้องรอดำเนินการ" />
          <Tab label="คำร้องดำเนินการแล้ว" />
        </Tabs>

        {tabValue === 0 && (
          <Box>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              คำร้องรอดำเนินการ
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              PENDING LIST
            </Typography>
            <Paper sx={{ mt: 1, p: 2 }}>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" sx={{ py: 0.5 }}>
                        วันที่
                      </TableCell>
                      <TableCell align="center" sx={{ py: 0.5 }}>
                        ประเภท
                      </TableCell>
                      <TableCell align="center" sx={{ py: 0.5 }}>
                        หัวข้อคำร้อง
                      </TableCell>
                      <TableCell align="center" sx={{ py: 0.5 }}>
                        รายละเอียด
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading && (
                      <TableRow>
                        <TableCell colSpan={4}>Loading...</TableCell>
                      </TableRow>
                    )}
                    {error && (
                      <TableRow>
                        <TableCell colSpan={4}>{error}</TableCell>
                      </TableRow>
                    )}
                    {allPendingForms.length > 0 ? (
                      allPendingForms
                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                        .map((form) => (
                          <TableRow key={form.form_id}>
                            <TableCell align="center" sx={{ py: 0.5 }}>
                              {form.date}
                            </TableCell>
                            <TableCell align="center" sx={{ py: 0.5 }}>
                              {form.form_type}
                            </TableCell>
                            <TableCell align="center" sx={{ py: 0.5 }}>
                              {form.additional_fields.title}
                            </TableCell>
                            <TableCell align="center" sx={{ py: 0.5 }}>
                              <ButtonGroup color="primary">
                                <Button component={Link} to={`professor-detail/${form.form_id}`}>
                                  รายละเอียด
                                </Button>
                              </ButtonGroup>
                            </TableCell>
                          </TableRow>
                        ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} align="center">
                          ไม่มีคำร้องที่รอดำเนินการ
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>
        )}

        {tabValue === 1 && (
          <Box sx={{ mt: 10 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              คำร้องดำเนินการแล้ว
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              COMPLETED LIST
            </Typography>
            <Paper sx={{ p: 2 }}>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" sx={{ py: 0.5 }}>
                        วันที่
                      </TableCell>
                      <TableCell align="center" sx={{ py: 0.5 }}>
                        ประเภท
                      </TableCell>
                      <TableCell align="center" sx={{ py: 0.5 }}>
                        หัวข้อคำร้อง
                      </TableCell>
                      <TableCell align="center" sx={{ py: 0.5 }}>
                        รายละเอียด
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading && (
                      <TableRow>
                        <TableCell colSpan={4}>Loading...</TableCell>
                      </TableRow>
                    )}
                    {error && (
                      <TableRow>
                        <TableCell colSpan={4}>{error}</TableCell>
                      </TableRow>
                    )}
                    {allCompletedForms.length > 0 ? (
                      allCompletedForms
                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                        .map((form) => (
                          <TableRow key={form.form_id}>
                            <TableCell align="center" sx={{ py: 0.5 }}>
                              {form.date}
                            </TableCell>
                            <TableCell align="center" sx={{ py: 0.5 }}>
                              {form.form_type}
                            </TableCell>
                            <TableCell align="center" sx={{ py: 0.5 }}>
                              {form.additional_fields.title}
                            </TableCell>
                            <TableCell align="center" sx={{ py: 0.5 }}>
                              <ButtonGroup color="primary">
                                <Button component={Link} to={`professor-detail/${form.form_id}`}>
                                  รายละเอียด
                                </Button>
                              </ButtonGroup>
                            </TableCell>
                          </TableRow>
                        ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} align="center">
                          ไม่มีคำร้องที่ดำเนินการแล้ว
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>
        )}
      </Container>
    </div>
  );
}

export default AppTest
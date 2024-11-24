import React from 'react'
import { Box, Typography } from '@mui/material'

const TransferGradeDetail = ({ form }) => {
  return (
    <Box sx={{
      ml: 0,
      width: "100%",
      maxHeight: "200px",
      overflow: "auto",
      whiteSpace: "pre-wrap",
      wordWrap: "break-word",
      display:'flex'
  }}>
        <Typography variant="subtitle2" fontWeight="bold" gutterBottom sx={{ fontSize: "1.1rem" }}>วิชาที่ถ่ายโอนหน่วยกิต:</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "1.1rem" }}> {form.additional_fields.subject1},{form.additional_fields.subject2},{form.additional_fields.subject3},{form.additional_fields.subject4}</Typography>
    </Box>
  )
}

export default TransferGradeDetail

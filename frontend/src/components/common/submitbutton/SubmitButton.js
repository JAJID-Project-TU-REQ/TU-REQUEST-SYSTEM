import React from 'react'
import { Button,Typography, Grid2 } from '@mui/material'

const SubmitButton = (props) => {
  return (
    <div>
        <Grid2 item xs={12} sx={{ mt: 5, textAlign: 'center' }}>
          <Button variant="contained" onClick={props.onClick} sx={{ mb: 7, width: 150, height: 50, borderRadius: 8 }}>Submit</Button>
          <Typography variant='h6' sx={{ color: 'red', fontSize: 18 }}>คำร้องที่ถูกบันทึกและส่งจะไม่สามารถแก้ไขได้ กรุณาตรวจสอบข้อมูลก่อนบันทึก</Typography>
        </Grid2>
    </div>
  )
}

export default SubmitButton

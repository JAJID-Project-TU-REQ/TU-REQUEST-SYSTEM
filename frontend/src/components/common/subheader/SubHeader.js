import React from 'react'
import { Grid, Typography } from '@mui/material'

const SubHeader = () => {
  return (
    <div>
        <Grid container sx={{ mt: 5, textAlign: 'start', pb: 4,}}>
            <Grid item >
            <Typography variant='h5' sx={{fontSize: 22}} >กรอกข้อมูลคำร้อง</Typography>
            <Typography variant='h6' sx={{ color: 'red', fontSize: 18}}>• โปรดกรอกข้อมูลให้ถูกต้องและครบถ้วนเพื่อความรวดเร็วในการดำเนินการ</Typography>
            </Grid>
      </Grid>
    </div>
  )
}

export default SubHeader

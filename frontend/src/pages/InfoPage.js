import React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import HistoryIcon from '@mui/icons-material/History';
import TitleIcon from '@mui/icons-material/Title';
import CreateIcon from '@mui/icons-material/Create';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Box } from '@mui/material'

function InfoPage() {
  const pdfUrl = "https://drive.google.com/file/d/1J6SAnIUJFAXHAoXaJSys5Bk7jvqWzcxl/preview";

  return (
    <Container maxWidth="md" sx={{ mt: 14, mb: 5 }}>
    {/* Grid container to align the timeline */}
    <Grid container sx={{ textAlign: 'center', borderBottom: 2, borderColor: 'divider', pb: 4}}>
    <Grid item xs={12}>
    <Typography variant='h6' sx={{fontWeight: 600}}>วิธีการยื่นคำร้อง</Typography>
        {/* Timeline inside the grid */}
      {/* First */}
        <Timeline position="alternate">
          <TimelineItem>
            <TimelineOppositeContent sx={{ m: 'auto 0' }} align="right" variant="body2" color="text.secondary"
            > เริ่มต้นการใช้งาน
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot sx={{
          background: 'linear-gradient(90deg, #902923, #2A0C0A)',
          border: 'none'}}>
                <TitleIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography variant="h6" component="span" sx={{fontWeight:'bold'}}>
                เลือกประเภทคำร้อง
              </Typography>
              <Typography>เลือกประเภทคำร้อง</Typography>
              <Typography>และหัวข้อคำร้องย่อยที่ต้องการจะยื่น</Typography>
            </TimelineContent>
          </TimelineItem>

        {/*Second */}
          <TimelineItem>
            <TimelineOppositeContent
              sx={{ m: 'auto 0' }}
              variant="body2"
              color="text.secondary"
            >
              กรอกข้อมูล
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot sx={{
          background: 'linear-gradient(90deg, #902923, #2A0C0A)',
          border: 'none'}}>
                <CreateIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography variant="h6" component="span" sx={{fontWeight:'bold'}}>
                กรอกข้อมูลคำร้อง
              </Typography>
              <Typography>กรอกข้อมูลตามฟอร์มในระบบ</Typography>
            </TimelineContent>
          </TimelineItem>

        {/*Third */}
          <TimelineItem>
            <TimelineOppositeContent sx={{ m: 'auto 0' }} align="right" variant="body2" color="text.secondary"
            > ตรวจสอบความถูกต้อง
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot sx={{
          background: 'linear-gradient(90deg, #902923, #2A0C0A)',
          border: 'none'}}>
                <SearchIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography variant="h6" component="span" sx={{fontWeight:'bold'}}>
                ตรวจสอบรายละเอียดในฟอร์ม
              </Typography>
              <Typography>ตรวจสอบให้แน่ชัดว่าคำร้องมีความถูกต้อง</Typography>
              <Typography> เนื่องจากคำร้องไม่สามารถแก้ไขได้</Typography>
            </TimelineContent>
          </TimelineItem>

                  {/*Fourth */}
                  <TimelineItem>
            <TimelineOppositeContent sx={{ m: 'auto 0' }} align="right" variant="body2" color="text.secondary"
            > บันทึก
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot sx={{
          background: 'linear-gradient(90deg, #902923, #2A0C0A)',
          border: 'none'}}>
                <AddIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography variant="h6" component="span" sx={{fontWeight:'bold'}}>
              กดบันทึกเพื่อส่งคำร้อง
              </Typography>
              <Typography>คำร้องจะถูกบันทึกและดำเนินการ</Typography>
              <Typography> ภายใน 7 วันทำการ</Typography>
            </TimelineContent>
          </TimelineItem>

                            {/*Fifth */}
                            <TimelineItem>
            <TimelineOppositeContent sx={{ m: 'auto 0' }} align="right" variant="body2" color="text.secondary"
            > ติดตามสถานะ
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot sx={{
          background: 'linear-gradient(90deg, #902923, #2A0C0A)',
          border: 'none'}}>
                <HistoryIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography variant="h6" component="span" sx={{fontWeight:'bold'}}>
              ตรวจสอบสถานะคำร้อง
              </Typography>
              <Typography>ตรวจสอบคำร้องได้จากแถบสถานะ</Typography>
            </TimelineContent>
          </TimelineItem>

          {/*Sixth */}
          <TimelineItem>
            <TimelineOppositeContent sx={{ m: 'auto 0' }} align="right" variant="body2" color="text.secondary"
            > ประเภทคำร้อง
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot sx={{
          background: 'linear-gradient(90deg, #902923, #2A0C0A)',
          border: 'none'}}>
                <HistoryIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography variant="h6" component="span" sx={{fontWeight:'bold'}}>
              ตรวจสอบสถานะคำร้อง
              </Typography>
              <Typography>หากไม่ทราบข้อมูลเกี่ยวกับคำร้องสามารถอ่านเพิ่มเติมได้ตามประเภทคำร้อง</Typography>
              <Typography sx={{fontWeight:'bold'}}> ด้านล่าง</Typography>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
        <Typography variant='h6' sx={{fontWeight: 600, mt: 4}}>ตัวอย่างรายละเอียดคำร้อง</Typography>
        <Box sx={{ mt: 4 }}>
          <Typography variant='h6' sx={{fontWeight: 100}}>รายละเอียดการเทียบโอนวิชา EL105</Typography>
          <iframe
            src={pdfUrl}
            width="100%"
            height="600px"
            style={{ border: 'none' }}
            title="PDF Preview"
          ></iframe>
        </Box>
      </Grid>
    </Grid>
  </Container>
);
}

export default InfoPage;
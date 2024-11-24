import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import PaidIcon from '@mui/icons-material/Paid';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import SmsIcon from '@mui/icons-material/Sms';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import AssistantIcon from '@mui/icons-material/Assistant';


export const studentItem = [
    {
        id: 1,
        icon: <ImportContactsIcon/>,
        label: 'คำร้องประเภทวิชาการ',
        children: [
            {
                id: 1,
                label: 'คำร้องทั่วไป',
                routes: 'normal-request'
            },
            {
                id: 2,
                label: 'คำร้องจดทะเบียนรายวิชา',
                routes: 'add-subject'
            },
            {
                id: 3,
                label: 'คำร้องถอนรายวิชาล่าช้า',
                routes: 'withdraw-subject'
            },
            {
                id: 4,
                label: 'คำร้องขอจดทะเบียนต่ำกว่า/เกินกว่าข้อบังคับ',
                routes: 'normal-request'
            },
            {
                id: 5,
                label: 'คำร้องขอจดทะเบียนข้ามสถาบัน', 
                routes: 'normal-request'
            },
            {
                id: 4,
                label: 'คำร้องขอเปลี่ยนกลุ่มเรียน (Section)',
                routes: 'change-section'
            }

        ]
    },
    {
        id:2,
        icon: <PaidIcon/>,
        label: 'คำร้องประเภทค่าใช้จ่าย',
        children: [
            {
                id: 1,
                label: 'คำร้องขอผ่อนผันการชำระค่าใช้จ่ายจดทะเบียน',
                routes: 'normal-request'
            },
            {
                id: 2,
                label: 'คำร้องขอคืนค่าธรรมเนียม',
                routes: 'normal-request'
           },
           {
                id: 3,
                label: 'คำร้องขอปรับโครงสร้างหนี้ผ่อนผัน',
                routes: 'normal-request'
           }
        ]
    },
    {
        id: 3,
        icon: <PersonSearchIcon/>,
        label: 'คำร้องสถานะนักศึกษา',
        children: [
            {
                id: 1,
                label: 'คำร้องขอรับเอกสารฝึกงาน',
                routes: 'normal-request'
              },
              {
                id: 2,
                label: 'คำร้องขอลาพักการศึกษา',
                routes: 'normal-request'
           },
           {
               id: 3,
               label: 'คำร้องขอคืนสภาพนักศึกษา',
               routes: 'normal-request'
           },
           {
               id: 4,
               label: 'คำร้องรักษาสถานภาพ',
               routes: 'normal-request'
           },
           {
               id: 5,
               label: 'คำร้องขอลาออก',
               routes: 'quit'
           }
         ]
    },
    {
        id: 4,
        icon: <SmsIcon/>,
        label: "คำร้องอื่นๆ",
        children: [
            {
                id: 1,
                label: 'คำร้องขอทบทวนผลการศึกษา',
                routes: 'normal-request'
              },
              {
                id: 2,
                label: 'คำร้องขอยื่นแจ้งจบล่าช้า',
                routes: 'normal-request',
           },
           {
               id: 3,
               label: 'คำร้องขอยกเลิกการแจ้งจบ',
               routes: 'normal-request'
           },
           {
               id: 4,
               label: 'คำร้องขอกักตัวสอบ',
               routes: 'normal-request'
           },
           {
               id: 5,
               label: 'คำร้องกรณีขาดสอบ',
               routes: 'normal-request'
           },
           {
               id: 6,
               label: 'คำร้องขอเปิดรายวิชากรณีพิเศษ',
               routes: 'normal-request'
           }
         ]
    },
    {
        id: 5,
        icon: <BookmarksIcon/>,
        label: 'คำร้องเทียบโอนรายวิชา',
        children: [
            {
                id: 1,
                label: 'คำร้องเทียบโอนรายวิชา (มหาวิทยาลัยอื่น)',
                routes: 'transfer-grade'
              },
              {
                id: 2,
                label: 'คำร้องเทียบโอนรายวิชาทั่วไป (E-Learning)',
                routes: 'exemption-elearning',
           },
           {
               id: 3,
               label: 'คำร้องเทียบโอนรายวิชาทั่วไป (วิชา TU)',
               routes: 'exemption-tu' 
           },
           {
               id: 4,
               label: 'คำร้องเทียบโอนรายวิชาทั่วไป (วิชาภาษาอังกฤษ)',
               routes: 'exemption-el'
           }
         ]
    },
    {
        id: 6,
        icon: <AssistantIcon/>,
        label: 'ข้อมูลคำร้อง',
        children: [
            {
                id: 1,
                label: 'ข้อมูลและวิธียื่นคำร้อง',
                routes: 'info-page'
              }
         ]
    }
]

export const professorItem = [
    {
        id: 1,
        icon: <ImportContactsIcon/>,
        label: 'คำร้องประเภทวิชาการ',
        children: [
            {
                id: 1,
                label: 'คำร้องทั่วไป',
                routes: 'professor-dashboard/normal_request'
            },
            {
                id: 2,
                label: 'คำร้องจดทะเบียนรายวิชา',
                routes: 'professor-dashboard/registlate'
            },
            {
                id: 3,
                label: 'คำร้องถอนรายวิชาล่าช้า',
                routes: 'professor-dashboard/withdrawlate'
            },
           

        ]
    },
    {
        id: 2,
        icon: <BookmarksIcon/>,
        label: 'คำร้องเทียบโอนรายวิชา',
        children: [
            {
                id: 1,
                label: 'คำร้องเทียบโอนรายวิชา (มหาวิทยาลัยอื่น)',
                routes: 'professor-dashboard/transfer_grade'
              },
              {
                id: 2,
                label: 'คำร้องเทียบโอนรายวิชาทั่วไป (E-Learning)',
                routes: 'professor-dashboard/exemption_e-learning',
           },
           {
               id: 3,
               label: 'คำร้องเทียบโอนรายวิชาทั่วไป (วิชา TU)',
               routes: 'professor-dashboard/exemption_TU' 
           },
           {
               id: 4,
               label: 'คำร้องเทียบโอนรายวิชาทั่วไป (วิชาภาษาอังกฤษ)',
               routes: 'professor-dashboard/exemption_english'
           },
          
    
         ]
    },
    
]
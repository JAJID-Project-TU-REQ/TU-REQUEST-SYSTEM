import React from 'react'
import { Grid, Typography, Box } from '@mui/material'

const TopicBox = (props) => {
  return (
          <Box sx={{display:"flex", alignItems: 'center', backgroundColor: "#902923", borderRadius: 4, padding: props.padding, color: '#FFFFFF', mr: 2}}>
          <Typography sx={{fontSize: '20px', flexShrink: 0}}>
           {props.text}
           </Typography>
          </Box>
  )
}

export default TopicBox

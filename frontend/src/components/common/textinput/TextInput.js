import React from 'react'
import { TextField } from '@mui/material'


const TextInput = (props) => {
  return (
      <TextField id= {props.id} label= {props.label} variant="outlined" onChange={props.onChange} multiline rows={props.rows} style={{ width: props.width }} 
      sx={{ m: props.m, display: 'flex', flexGrow: props.flexGrow, 
        '& .MuiOutlinedInput-root': {
          borderRadius: '20px',
          fontFamily: 'Kanit, Arial, sans-serif',
           // Apply border-radius to the input field
        }
      }} />
  )
}

export default TextInput

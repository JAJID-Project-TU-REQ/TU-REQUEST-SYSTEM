import { Select, MenuItem } from '@mui/material'
import React from "react";
import GetSubject from '../../../method/getSubject';

const SelectSubject = (props) => {
  const { data, loading, error } = GetSubject();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    
        <Select variant="outlined" onChange={props.onChange} sx={{display:'flex', height: props.height,borderRadius:5,mt:props.mt, flexGrow: props.flexGrow,width: '150px' }}>
          {data.length > 0 ? (
        data.map((subjects) => (
        <MenuItem value={subjects.subject} aria-placeholder="select subject">{subjects.subject}</MenuItem>))
    ) : (null)}
          </Select>
   
  )
}

export default SelectSubject
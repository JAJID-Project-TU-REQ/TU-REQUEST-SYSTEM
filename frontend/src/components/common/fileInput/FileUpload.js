import React from 'react'
import { Typography, Box } from '@mui/material'


const FileUpload = (props) => {
    return (
        <Box sx={{ display: 'felx', flexGrow: 1 }}>
            <Typography sx={{ fontWeight: 'bold' }} variant="h6">{props.text}</Typography>
            <Box
                sx={{ mt: 1, padding: "16px 6px", border: "1px dashed grey", borderRadius: 4, flexGrow: props.flexGrow }}>
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={props.onChange}
                />
            </Box>
        </Box>
    )
}

export default FileUpload

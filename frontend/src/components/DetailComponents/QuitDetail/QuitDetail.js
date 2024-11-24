import React from 'react'
import { Box, Typography } from '@mui/material'

const QuitDetail = ({ form }) => {
  return (
    <div>
        <Box display={"flex"}>
                <Box sx={{ width: "20%", mr: 0 }}>
                    <Typography variant="subtitle2" fontWeight="bold" gutterBottom sx={{ fontSize: "1.1rem" }}>
                        เหตุผลที่ต้องการลาออก :
                    </Typography>
                </Box>
                <Box
                    sx={{
                        ml: 0,
                        width: "88%",
                        maxHeight: "200px",
                        overflow: "auto",
                        whiteSpace: "pre-wrap",
                        wordWrap: "break-word",
                    }}
                >
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ whiteSpace: "pre-line", fontSize: "1.1rem" }}
                    >
                        {form.additional_fields.reason}
                    </Typography>
                </Box>
            </Box>
    </div>
  )
}

export default QuitDetail

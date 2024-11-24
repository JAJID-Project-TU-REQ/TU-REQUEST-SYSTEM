import React from 'react'
import { Box, Typography } from '@mui/material'

const ExemptionTUDetail = ({ form }) => {
  return (
    <div>
        {/* คำอธิบายประกอบ */}
        <Box display={"flex"}>
                <Box sx={{ width: "17%", mr: 0 }}>
                    <Typography variant="subtitle2" fontWeight="bold" gutterBottom sx={{ fontSize: "1.1rem" }}>
                        คำอธิบายประกอบ :
                    </Typography>
                </Box>
                <Box
                    sx={{
                        ml: 0,
                        width: "100%",
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
                        {form.additional_fields.content}
                    </Typography>
                </Box>
            </Box>

            {/* วิธีที่เลือก */}
            <Box display={"flex"}>
                <Box sx={{ width: "25%", mr: 0 }}>
                    <Typography variant="subtitle2" fontWeight="bold" gutterBottom sx={{ fontSize: "1.1rem" }}>
                        รหัสวิชาที่ต้องการเทียบโอน :
                    </Typography>
                </Box>
                <Box
                    sx={{
                        ml: 0,
                        width: "95%",
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
                    {form.additional_fields.subject}
                    </Typography>
                </Box>
            </Box>
    </div>
  )
}

export default ExemptionTUDetail

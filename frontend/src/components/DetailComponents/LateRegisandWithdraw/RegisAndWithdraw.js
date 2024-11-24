import React from "react";
import { Box, Typography } from "@mui/material";

const RegisAndWithdraw = ({ form }) => {
  return (
    <div>
      <Box>
        {/* Subject */}
        <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
          <Typography
            variant="subtitle2"
            fontWeight="bold"
            sx={{ fontSize: "1.1rem", mr: 1 }}
          >
            คำอธิบายประกอบ :
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ whiteSpace: "pre-line", fontSize: "1.1rem" }}
          >
            {form.additional_fields.subject}
          </Typography>
        </Box>

        {/* Section */}
        <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
          <Typography
            variant="subtitle2"
            fontWeight="bold"
            sx={{ fontSize: "1.1rem", mr: 1 }}
          >
            คำอธิบายประกอบ :
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ whiteSpace: "pre-line", fontSize: "1.1rem" }}
          >
            {form.additional_fields.section}
          </Typography>
        </Box>

        {/* Professor */}
        <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
          <Typography
            variant="subtitle2"
            fontWeight="bold"
            sx={{ fontSize: "1.1rem", mr: 1 }}
          >
            คำอธิบายประกอบ :
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ whiteSpace: "pre-line", fontSize: "1.1rem" }}
          >
            {form.additional_fields.professor}
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default RegisAndWithdraw;

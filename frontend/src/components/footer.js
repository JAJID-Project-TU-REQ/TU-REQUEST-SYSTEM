import React from 'react';
import { Typography } from '@mui/material';

const Footer = () => {
    const footerStyle = {
        width: '100%',
        height: '4%',
        background: 'linear-gradient(to right, #C20114, #000000)',
        color: '#FFFFFF',
        position: 'fixed',
        bottom: '0',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        lineHeight: '111px'
    };

    return (
        <div style={footerStyle}>
            <Typography 
            padding="auto"
            textAlign="center" 
            variant="body1">
                JAJID - TU REQEUST SYSTEM
            </Typography>
        </div>
    );
};

export default Footer;
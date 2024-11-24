import React from 'react';
import { Grid, Toolbar, Typography } from '@mui/material';

function Error() {
    return (
        <Grid 
            container 
            direction="column" 
            alignItems="center" 
            justifyContent="center" 
            sx={{ minHeight: '100vh', textAlign: 'center', backgroundColor: '#f9f9f9' }}
        >
            <Toolbar />
            <Typography variant="h1" color="error" gutterBottom>
                403
            </Typography>
            <Typography variant="h4" color="textPrimary" gutterBottom>
                Access Denied
            </Typography>
            <Typography variant="body1" color="textSecondary">
                You do not have permission to view this page.
            </Typography>
        </Grid>
    );
}

export default Error;

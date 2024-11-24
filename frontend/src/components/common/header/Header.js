import React from 'react'
import { Grid, Typography } from '@mui/material'

const Header = (props) => {
  return (
    <div>
      <Grid container sx={{mt: 5, textAlign: 'center', borderBottom: 2, borderColor: 'divider', pb: 4 }}>
        <Grid item xs={12}>
          <Typography variant='h4' sx={{fontWeight: 600}}>{props.text}</Typography>
        </Grid>
      </Grid>
    </div>
  )
}

export default Header

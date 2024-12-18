import React from 'react'
import { AppBar, IconButton, Toolbar, Grid2, Typography, Divider, } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import IconPerson from '@mui/icons-material/Person';
import {  useDispatch} from 'react-redux';
import { toggle } from '../../redux/toggleSlice';
import logo from '../../assets/images/logo.png';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';



const Navbar = () => {
  const dispatch = useDispatch();
  const full_name = localStorage.getItem('name_th');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleToggle = () => {
    dispatch(toggle());
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
  };

  return (
    <>
      <AppBar sx={{boxShadow: 'none' ,backgroundColor: '#fff', justifyContent: 'center',}} >
        <Toolbar >
            <IconButton sx={{mr: 2}} onClick={handleToggle}>
             <MenuIcon />
            </IconButton>
            <Grid2 item sx={{flexGrow: 1}}>
            <img src="https://tu.ac.th/uploads/news-tu/banner/banner64/02%20%E0%B9%82%E0%B8%A5%E0%B9%82%E0%B8%81%E0%B9%89%E0%B8%98%E0%B8%A3%E0%B8%A3%E0%B8%A1%E0%B8%88%E0%B8%B1%E0%B8%81%E0%B8%A3%20%E0%B8%82%E0%B8%B2%E0%B8%A7-%E0%B8%94%E0%B8%B3.jpg" alt="Thamasart" style={{ height: '40px' }} />
            </Grid2>
            <Typography variant="body1" sx={{ color: '#000', mr: 2 }}>{full_name}</Typography>
            <IconButton
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <IconPerson />
            </IconButton>
            <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
        </Toolbar>
        <Divider />
      </AppBar>
    </>
  )
}

export default Navbar
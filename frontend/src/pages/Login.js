import React, { useState } from 'react';
import { Box, Typography, TextField, Button, AppBar, Toolbar, IconButton, } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import { login } from '../redux/loginState';
import { useDispatch } from 'react-redux';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    const response = await fetch('http://localhost:8000/auth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // Correct content type
      },

      body: formData, // Send URL-encoded data
    });
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('username', data.username); // Store username
      localStorage.setItem('name_th', data.name_th); // Store name in Thai
      localStorage.setItem('role', data.role); // Store role
      localStorage.setItem('advisor', data.advisor); // Store advisor
      console.log(data.username)
      console.log(data.name_th)
      console.log(data)
      if (data.role === 'student') {
        changeLoginState() // Redirect based on role
      } else {
        changeLoginState(); // Redirect based on role
      }
    } else {
      setError('Invalid username or password');
    }
  };

  const dispatch = useDispatch();
  const changeLoginState = () => {
    dispatch(login());
  }

  return (
    <>
      <Box>
        <AppBar sx={{ backgroundColor: '#FFFFFF', 
          boxShadow: 'none', 
          borderBottom: '0.5px solid #000' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, color: '#000' }}>
            </IconButton>
            <Box sx={{ display: 'flex', 
              flexGrow: 1, 
              alignItems: 'center' }}>
              <img src={logo} alt="Thamasart" style={{ height: '40px' }} />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        sx={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          '::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'url(https://tu.ac.th/uploads/news-tu/banner/banner64/vr22.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: -1,
            opacity: 0.5, // Adjust the opacity to create the fading effect
          },
        }}
      >
        <Box
          sx={{
            mt: 10,
            width: '791',
            height: '693',
            backgroundColor: 'rgba(255, 255, 255, 0.72)',
            borderRadius: '71px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 3,
            padding: 10,
            zIndex: 1,
          }}
        >
          <Typography variant='h4'>ระบบคำร้องมหาวิทยาลัยธรรมศาสตร์</Typography>
          <Typography variant='h6'>TU REQUEST SYSTEM (TU-REQ)</Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="Username"
              variant="outlined"
              margin="normal"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            )}
              <Button 
              type="submit" 
              variant="contained" 
              color="primary" >
                Sign In
              </Button>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default Login;
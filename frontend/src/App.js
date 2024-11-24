import { Grid2, Toolbar } from '@mui/material';
import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import Login from './pages/Login';
import { useSelector } from 'react-redux';
import Footer from './components/footer';
function Component(params) {
  return (

    <div>
      <Sidebar/>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  ) 
}

const App = () => {
  const isLoggedIn = useSelector((state) => state.login.value);
  const token = localStorage.getItem('token');

  return (
    <Grid2 >
      {isLoggedIn || token ? (
    <Component />
  ) : (
    <Login />
  )}
    </Grid2>
  )
}

export default App;
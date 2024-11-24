import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedprofessorLayout = () => {
    const role = localStorage.getItem('role');
    
    if (!(role ===  'professor') && !(role === 'admin')) {
        return <Navigate to="/error403" />; // Redirect to login if not authenticated
    }else {
        return <Outlet />; // Render the protected routes inside this layout
    }
};

export default ProtectedprofessorLayout;
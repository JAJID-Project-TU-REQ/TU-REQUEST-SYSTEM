    import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedLayout = () => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/" />; // Redirect to login if not authenticated
    }

    return <Outlet />; // Render the protected routes inside this layout
};

export default ProtectedLayout;
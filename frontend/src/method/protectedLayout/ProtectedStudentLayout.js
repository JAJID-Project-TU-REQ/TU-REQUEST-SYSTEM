import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedStudentLayout = () => {
    const role = localStorage.getItem('role');
   
    if (!(role === 'student')) {
        return <Navigate to="/error403" />
    }else{
        return <Outlet />;
    }

};

export default ProtectedStudentLayout;
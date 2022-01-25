import React from 'react'
import { auth } from '../firebase-config';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  return (
    (auth.currentUser) ? <Outlet /> : <Navigate to="/login" />
  )
}

export default PrivateRoute

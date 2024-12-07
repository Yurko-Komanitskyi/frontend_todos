/* eslint-disable */
import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

function RequireUnAuth() {
  const auth = useSelector(state => state.auth.auth);
  const location = useLocation();
  return !!auth?.user ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
}

export default RequireUnAuth;

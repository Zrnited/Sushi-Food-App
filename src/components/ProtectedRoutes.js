import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const Auth = ()=>{
    const user = JSON.parse(sessionStorage.getItem('cart'));
    return user
}

const ProtectedRoutes = () => {

    const userAuth = Auth()

  return (
    userAuth ? <Outlet /> : <Navigate to={'/menu'}/>
  )
}

export default ProtectedRoutes
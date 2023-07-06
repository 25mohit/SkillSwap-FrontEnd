import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Login from '../../components/Pages/Login/Login';

const AuthWraper = props => {
  const { children } = props;
  const isLoggedIn = Boolean(localStorage.getItem('loggedIn'))

  const navigate = useNavigate()

  useEffect(() => {
    if(!isLoggedIn || isLoggedIn === undefined || typeof isLoggedIn !== 'boolean' ){
      localStorage.clear()
      // navigate('/login')
    }
  },[])
  
  return (
    <>
      {
        isLoggedIn ? children : <Login />
      }
    </>
  )
}

export default AuthWraper
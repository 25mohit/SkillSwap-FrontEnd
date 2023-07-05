import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const AuthWraper = props => {
  const { children } = props;
  const isLoggedIn = Boolean(localStorage.getItem('loggedIn'))

  const navigate = useNavigate()

  useEffect(() => {
    if(!isLoggedIn || isLoggedIn === undefined || typeof isLoggedIn !== 'boolean' ){
      localStorage.clear()
      navigate('/login')
    }
  },[])
  
  return (
    <>
      {
        isLoggedIn ? children : null
      }
    </>
  )
}

export default AuthWraper
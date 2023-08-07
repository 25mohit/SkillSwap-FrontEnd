import Input from '../../../Utils/Component/Form/Input'
import { Link, useNavigate } from 'react-router-dom'
import Form from '../../Layouts/Form/Form'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LoginUser } from '../../../Redux/Actions/Actions'
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { signInWithFacebook, signInWithGithub, signInWithGoogle } from '../../../firebase'

const LoginForm = () => {

  useEffect(() => {
    localStorage.clear()
  },[])

  const [errors, setErrors] = useState({})
  const [userForm, setUserForm] = useState({
    email:'',
    password:''
  })
  const dispatch = useDispatch()

  const onChangeHandler = e => {
    const {name, value} = e.target
    setUserForm({...userForm, [name]:value})
  }

  const onValidate = () => {
    setErrors(() => {
      let err = {}
      if(!userForm.email){
        err.email = true
      }
      if(!userForm.password){
        err.password = true
      }
      return err
    })
  }
  
  const notificationState = useSelector(state => state.home.notification)

  const navigate = useNavigate()

  useEffect(() => {
    if(notificationState && Object.keys(notificationState).length>0 && notificationState?.type !== 'danger'){
      navigate('/home')
    } else if(Object.keys(notificationState).length>0 ) {
      navigate('/register')
    }
  },[notificationState])

  const onLoginHandler = (e) => {
    e.preventDefault()
    onValidate()
    if( userForm.email ==='' || userForm.password === "") {
      return false
    }
    else {
      const payload = {
        email: userForm.email,
        password: userForm.password,
        loginBy: "credentials",
      }
      dispatch(LoginUser(payload))
    }
  }

  const [getLoginData, setGetLoginData] = useState({})

  const onSIgn = (e) => {
    e.preventDefault()
    signInWithGoogle({ setGetLoginData })
  }
  useEffect(() => {
    if(getLoginData && Object.keys(getLoginData).length > 0){
      const payload = {
        email: getLoginData?.email,
        loginBy: 'google'
      }
      dispatch(LoginUser(payload))
      localStorage.setItem('temp-token', getLoginData?.accessToken)
    }
  },[getLoginData])

  const facebookSigninHandler = (e) => {
    e.preventDefault()
    signInWithFacebook({setGetLoginData})
  }

  const githubSigninHandler = (e) => {
    e.preventDefault()
    signInWithGithub({setGetLoginData})
  }

  return (
    <Form heading="Login">
        <Input required={false} onChange={onChangeHandler} onInput={() => setErrors({...errors, email:false})} value={userForm.email} error={errors.email} type="text" placeholder="Enter your email" name="email"/>
        <Input required={false} onChange={onChangeHandler} onInput={() => setErrors({...errors, password:false})} value={userForm.password} error={errors.password} type="password" placeholder="Enter your password" name="password"/>
        <button className="btn-primary" onClick={onLoginHandler}>Sign In</button>
        
        {/* <div id="signInDiv"></div> */}
        <div className="social-wraper">
          <button className='social-media-login' onClick={onSIgn}><span><FcGoogle /></span></button>
          <button className='social-media-login' onClick={facebookSigninHandler}><span style={{color:"rgb(23,115,234)"}}><FaFacebook /></span></button>
          <button className='social-media-login' onClick={githubSigninHandler}><span><FaGithub /></span></button>
        </div>
        <div className="footer flex-between">
          <Link to="/terms-and-conditions" target='_blank'>Terms & Conditions</Link >
          <span>Didn't have a account&nbsp;<Link to="/register">Register</Link>?</span>
        </div>
    </Form>
  )
}

export default LoginForm
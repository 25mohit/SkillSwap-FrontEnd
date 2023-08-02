import Input from '../../../Utils/Component/Form/Input'
import { Link, useNavigate } from 'react-router-dom'
import Form from '../../Layouts/Form/Form'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LoginUser } from '../../../Redux/Actions/Actions'

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
    if(notificationState && Object.keys(notificationState).length>0){
      navigate('/home')
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

  const handleCallbackResponse = (response) => {
    
    const responseData = JSON.parse(atob(response?.credential?.split('.')[1]))

    if(responseData && Object.keys(responseData).length > 0 && responseData?.email !== undefined && responseData?.email !== '') {
      const payload = {
        email: responseData?.email,
        loginBy: 'google'
      }
      dispatch(LoginUser(payload))
    }
    console.log("responseData", responseData);

  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "163904227095-5o4bsoh2spr6bd3kppvguifcru196d0e.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme:"outline", size:"large"}
    )
  },[])

  return (
    <Form heading="Login">
        <Input onChange={onChangeHandler} onInput={() => setErrors({...errors, email:false})} value={userForm.email} error={errors.email} type="text" placeholder="Enter your email" name="email"/>
        <Input onChange={onChangeHandler} onInput={() => setErrors({...errors, password:false})} value={userForm.password} error={errors.password} type="password" placeholder="Enter your password" name="password"/>
        <button className="btn-primary" onClick={onLoginHandler}>Sign In</button>
        
        <div id="signInDiv"></div>
        <div className="footer flex-between">
          <Link to="/terms-and-conditions" target='_blank'>Terms & Conditions</Link >
          <span>Didn't have a account&nbsp;<Link to="/register">Register</Link>?</span>
        </div>
    </Form>
  )
}

export default LoginForm
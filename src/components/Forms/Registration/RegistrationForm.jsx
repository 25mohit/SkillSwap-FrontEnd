import React, { useEffect, useState } from 'react'
import Input from '../../../Utils/Component/Form/Input'
import { Link } from 'react-router-dom'
import Form from '../../Layouts/Form/Form'
import Select from '../../../Utils/Component/Form/Select'
import { useDispatch } from 'react-redux'
import { RegisterUser } from '../../../Redux/Actions/Actions'

const RegistrationForm = () => {

  const [userForm, setUserForm] = useState({
    name:'',
    email:'',
    userName:"",
    mobile:null,
    password:'',
    rePassword:'',
    country:'',
    state:'',
    city:''
  })
  const [errors, setErrors] = useState({})

  const dispatch = useDispatch()

  const onChangeHandler = e => {
    const {name , value} = e.target
    setUserForm({...userForm, [name]:value})
  }

  const getTempToken = localStorage.getItem('temp-token')

  useEffect(() => {
    if(getTempToken !== undefined && getTempToken !== null){
      const responseData = JSON.parse(atob(getTempToken?.split('.')[1]))
      console.log("responseData", responseData);
      setUserForm({
        email: responseData?.email,
        name: responseData?.name,
        userName: `${responseData?.name?.split(' ')?.join('')}`
      })
      console.log("responseData", responseData);
    }
  },[])

  const validate = () => {
    setErrors(() => {
      let err = {}
      if(!userForm.name){
        err.name = true
      }
      if(!userForm.email){
        err.email = true
      }
      if(!userForm.userName){
        err.userName = true
      }
      if(!userForm.mobile || userForm.mobile.length < 10){
        err.mobile = true
      }
      if(!userForm.password){
        err.password = true
      }
      if(!userForm.rePassword){
        err.rePassword = true
      }
      if(userForm.password !== userForm.rePassword){
        err.rePassword = true
        err.password = true
      }
      if(!userForm.country){
        err.country = true
      }
      if(!userForm.state){
        err.state = true
      }
      if(!userForm.city){
        err.city = true
      }
      return err
    })
  }

  const onRegisterHandler = e => {
    e.preventDefault()
    validate()
    if(userForm.name ==='' ||userForm.email ==='' ||userForm.userName ==='' ||userForm.mobile ==='' ||userForm.password ==='' ||userForm.rePassword ==='' ||userForm.country ==='' ||userForm.state ==='' || userForm.city ===''|| userForm.password !== userForm.rePassword || userForm.mobile.length < 10){
      return false
    } else {
      dispatch(RegisterUser(userForm))
    }
  }

  
  return (
    <Form heading="Register">
        <Input error={errors?.email} onInput={() => setErrors({...errors, email: false})} value={userForm?.email} onChange={onChangeHandler} type="text" placeholder="Enter your email" name="email"/>
        <div className="flex-row">
          <div className="div">
            <Input error={errors?.name} onInput={() => setErrors({...errors, name: false})} value={userForm?.name} onChange={onChangeHandler} type="text" placeholder="Enter your name" name="name"/>
          </div>
          <div className="div">
            <Input error={errors?.userName} onInput={() => setErrors({...errors, userName: false})} value={userForm?.userName} onChange={onChangeHandler} type="text" placeholder="Choose a user name @" name="userName"/>
          </div>
        </div>
        <div className="flex-row">
          <div className="div">
            <Input error={errors?.password} onInput={() => setErrors({...errors, password: false})} value={userForm?.password} onChange={onChangeHandler} type="password" placeholder="Enter your password" name="password"/>
          </div>
          <div className="div">
            <Input error={errors?.rePassword} onInput={() => setErrors({...errors, rePassword: false})} value={userForm?.rePassword} onChange={onChangeHandler} type="password" placeholder="Confirm password" name="rePassword"/>
          </div>
        </div>
        <div className="flex-row">
          <div className="div">
            <Input error={errors?.country} onInput={() => setErrors({...errors, country: false})} value={userForm?.country} onChange={onChangeHandler} type="text" placeholder="Country" name="country"/>
          </div>
          <div className="div">
            <Input error={errors?.state} onInput={() => setErrors({...errors, state: false})} value={userForm?.state} onChange={onChangeHandler} type="text" placeholder="State" name="state"/>
          </div>
        </div>
        <div className="flex-row">
          <div className="div">
            <Input error={errors?.city} onInput={() => setErrors({...errors, city: false})} value={userForm?.city} onChange={onChangeHandler} type="text" placeholder="City" name="city"/>
          </div>
          <div className="div empty">

          </div>
        </div>
        <Input error={errors?.mobile} onInput={() => setErrors({...errors, mobile: false})} value={userForm?.mobile} onChange={onChangeHandler} type="number" placeholder="Mobile no" name="mobile"/>
        <button className="btn-primary" onClick={onRegisterHandler}>Register</button>
        <div className="footer flex-between">
          <Link to="/terms-and-conditions" target='_blank'>Terms & Conditions</Link >
          <span>Already have an account&nbsp;<Link to="/login">Sign In</Link>?</span>
        </div>
    
    </Form>
  )
}

export default RegistrationForm
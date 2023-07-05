import React, { useState } from 'react'
import Input from '../../../Utils/Component/Form/Input'
import { Link } from 'react-router-dom'
import Form from '../../Layouts/Form/Form'
import Select from '../../../Utils/Component/Form/Select'

const options = [
  { label: "One", value: 1},
  { label: "Two", value: 1},
  { label: "Three", value: 1},
  { label: "Four", value: 1},
  { label: "Five", value: 1},
  { label: "Six", value: 1},
  { label: "Seven", value: 1},
  { label: "Eight", value: 1},
  { label: "Five", value: 1},
  { label: "Six", value: 1},
  { label: "Seven", value: 1},
  { label: "Eight", value: 1},
  { label: "Five", value: 1},
  { label: "Six", value: 1},
  { label: "Seven", value: 1},
  { label: "Eight", value: 1},
]

const RegistrationForm = () => {

  const [selectedOption, setSelectedOption] = useState('')
  const [userForm, setUserForm] = useState({})

  const onChangeHandler = e => {
    const {name , value} = e.target
    setUserForm({...userForm, [name]:value})
  }

  const onRegisterHandler = e => {
    e.preventDefault()
  }

  return (
    <Form heading="Register">
        <Input value={userForm?.email} onChange={onChangeHandler} type="text" placeholder="Enter your email" name="email"/>
        <div className="flex-row">
          <div className="div">
            <Input value={userForm?.name} onChange={onChangeHandler} type="text" placeholder="Enter your name" name="name"/>
          </div>
          <div className="div">
            <Input value={userForm?.userName} onChange={onChangeHandler} type="text" placeholder="Choose a user name @" name="userName"/>
          </div>
        </div>
        <div className="flex-row">
          <div className="div">
            <Input value={userForm?.password} onChange={onChangeHandler} type="password" placeholder="Enter your password" name="password"/>
          </div>
          <div className="div">
            <Input value={userForm?.rePassword} onChange={onChangeHandler} type="password" placeholder="Confirm password" name="rePassword"/>
          </div>
        </div>
        <div className="flex-row">
          <div className="div">
            <Input value={userForm?.country} onChange={onChangeHandler} type="text" placeholder="Country" name="country"/>
          </div>
          <div className="div">
            <Input value={userForm?.state} onChange={onChangeHandler} type="text" placeholder="State" name="state"/>
          </div>
        </div>
        <div className="flex-row">
          <div className="div">
            <Input value={userForm?.city} onChange={onChangeHandler} type="text" placeholder="City" name="city"/>
          </div>
          <div className="div">
            <Select options={options} value={selectedOption} onChange={setSelectedOption} name="city" placeholder="Select City"/>
          </div>
        </div>
        <Input value={userForm?.mobile} onChange={onChangeHandler} type="number" placeholder="Mobile no" name="mobile"/>
        <button className="btn-primary" onClick={onRegisterHandler}>Register</button>
        <div className="footer flex-between">
          <Link to="/login">Terms & Conditions</Link >
          <span>Already have an account&nbsp;<Link to="/login">Sign In</Link>?</span>
        </div>
    
    </Form>
  )
}

export default RegistrationForm
import React, { useState } from 'react'
import ProfileLayout from '../../Layouts/ProfileLayout/ProfileLayout'
import CardLayout from '../../Layouts/CardLayout/CardLayout'
import Toogler from '../Toogler/Toogler'

const UserRequests = () => {
  const [toogleOption, setToogleOption] = useState('sent')

  const toogleOptions = [
    {label:'Sent', value:"sent"},
    {label:'Received', value:"received"}
  ]

  return (
    <ProfileLayout>
      <div className="user-request">
        <Toogler current={toogleOption} onChange={setToogleOption} options={toogleOptions}/>
        <CardLayout>
          ad
        </CardLayout>
      </div>
    </ProfileLayout>
  )
}

export default UserRequests
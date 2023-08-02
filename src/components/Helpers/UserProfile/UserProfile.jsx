import { useEffect, useState } from 'react'
import ProfileLayout from '../../Layouts/ProfileLayout/ProfileLayout'
import ProfileInfo from './ProfileInfo'
import ProfileSkills from './ProfileSkills'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllSkills, SaveAPIResponse } from '../../../Redux/Actions/Actions'

const UserProfile = () => {
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetAllSkills())
  },[])

  const skillsList = useSelector(state => state.home.skillsList)

  return (
    <ProfileLayout>
      <section className="profile-section">
        <div className='info-section'>
          <ProfileInfo />
        </div>
        <div>
          {skillsList?.length > 0 && <ProfileSkills lists={skillsList}/>}
        </div>
      </section>
    </ProfileLayout>
  )
}

export default UserProfile
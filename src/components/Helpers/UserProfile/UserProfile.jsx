import { useEffect, useState } from 'react'
import ProfileLayout from '../../Layouts/ProfileLayout/ProfileLayout'
import ProfileInfo from './ProfileInfo'
import ProfileSkills from './ProfileSkills'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllSkills, GetProfile, SaveAPIResponse } from '../../../Redux/Actions/Actions'
import ProfileSkillSkelton from '../../Layouts/Skelton/ProfileSkillSkelton'
import ProfileInfoSkelton from '../../Layouts/Skelton/ProfileInfoSkelton'

const UserProfile = () => {
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetAllSkills())
    dispatch(GetProfile())
  },[])

  const skillsList = useSelector(state => state.home.skillsList)
  const profieData = useSelector(state => state.home.profile)

  console.log("profieData", profieData);
  return (
    <ProfileLayout>
      <section className="profile-section">
        <div className='info-section'>
          <ProfileInfoSkelton />
          {/* <ProfileInfo profieData={profieData}/> */}
        </div>
        <div>
          {skillsList?.length > 0 ? <ProfileSkills lists={skillsList}/> : <ProfileSkillSkelton />}
        </div>
      </section>
    </ProfileLayout>
  )
}

export default UserProfile
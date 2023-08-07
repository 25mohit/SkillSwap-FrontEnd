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

  document.title = `SkillSwap | ${profieData?.data?.name}'s Profile`

  const [isData, setIsData] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      if(!skillsList?.status){
        setIsData(true)
      }
    },3500)
  },[skillsList])

  return (
    <ProfileLayout>
      <section className="profile-section">
        <div className='info-section'>
          {
            Object.keys(profieData)?.length > 0 ? <ProfileInfo profieData={profieData}/> : <ProfileInfoSkelton />
          }
        </div>
        <div>
          {Object.keys(skillsList)?.length > 0 ? (<ProfileSkills lists={skillsList?.skills}/>) : 
            <div className='flex-column' style={{gap:'1.1rem'}}>
                {!isData ? 
                  <>
                    <ProfileSkillSkelton />
                    <ProfileSkillSkelton />
                    <ProfileSkillSkelton />
                  </> :
                  <h2 className='main-heading-text'>You have Not Added any Skills yet !</h2>
                }
            </div>
            }
            
        </div>
      </section>
    </ProfileLayout>
  )
}

export default UserProfile
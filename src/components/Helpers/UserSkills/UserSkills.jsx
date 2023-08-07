import ProfileLayout from '../../Layouts/ProfileLayout/ProfileLayout'
import SkillDetailRow from '../UserProfile/SkillDetailRow'
import CardLayout from '../../Layouts/CardLayout/CardLayout'
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllSkills, SaveAPIResponse, SaveSingleSkill } from '../../../Redux/Actions/Actions'
import ProfileSkillSkelton from '../../Layouts/Skelton/ProfileSkillSkelton'

const UserSkills = () => {

  const [responseData, setResponseData] = useState(false)
  const navigate = useNavigate()

  const onAddNewHandler = () => {
    navigate('/profile/skills/add-new-skill')
  }

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetAllSkills())
    dispatch(SaveAPIResponse({}))
    dispatch(SaveSingleSkill({}))
  },[])

  const skillsList = useSelector(state => state.home.skillsList)

  useEffect(() => {
    setTimeout(() => {
      if(skillsList?.length < 1){
        setResponseData(true)
      }
    },3500)
  },[])

  document.title = "SkillSwap | Skills"
  return (
    <ProfileLayout>
      <div className="skill-control-header flex-between">
        <div className='flex'>
          {skillsList?.skills?.length > 0 && <h2 className='heading-main'>You have added total {skillsList?.skills?.length} Skills</h2>}
        </div>
        <div>
          <button className="btn-primary" onClick={onAddNewHandler}>Add New Skill</button>
        </div>
      </div>
      <CardLayout>
        {
          skillsList?.length < 1 ? 
          !responseData ? <div className='flex-column' style={{gap:'1.1rem'}}>
            <ProfileSkillSkelton />
            <ProfileSkillSkelton />
            <ProfileSkillSkelton />
            <ProfileSkillSkelton />
            <ProfileSkillSkelton />
            <ProfileSkillSkelton />
            <ProfileSkillSkelton />
            <ProfileSkillSkelton />
          </div> :
          <h2 className='main-heading-text'>You have Not Added any Skills yet !</h2>
          :
          skillsList?.skills?.map((skill, index) => <SkillDetailRow key={index} heading={skill?.skillName} skills={skill} fullControl={true}/>)
        }
      </CardLayout>
    </ProfileLayout>
  )
}

export default UserSkills
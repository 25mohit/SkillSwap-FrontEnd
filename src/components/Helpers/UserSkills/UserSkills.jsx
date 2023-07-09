import ProfileLayout from '../../Layouts/ProfileLayout/ProfileLayout'
import SkillDetailRow from '../UserProfile/SkillDetailRow'
import CardLayout from '../../Layouts/CardLayout/CardLayout'
import { useNavigate } from "react-router-dom"
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllSkills, SaveAPIResponse, SaveSingleSkill } from '../../../Redux/Actions/Actions'

const UserSkills = () => {

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

  return (
    <ProfileLayout>
      <div className="skill-control-header flex-between">
        <div className='flex'>
          <h2 className='heading-main'>You have added total {skillsList?.length} Skills</h2>
        </div>
        <div>
          <button className="btn-primary" onClick={onAddNewHandler}>Add New Skill</button>
        </div>
      </div>
      <CardLayout>
        {
          skillsList?.map((skill, index) => <SkillDetailRow key={index} heading={skill?.skillName} skills={skill} fullControl={true}/>)
        }
      </CardLayout>
    </ProfileLayout>
  )
}

export default UserSkills
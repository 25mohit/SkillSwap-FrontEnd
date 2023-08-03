import React, { useEffect } from 'react'
import Footer from "../Footer/Footer"
import { useDispatch, useSelector } from 'react-redux'
import { GetAllSkillsPaginate } from '../../../Redux/Actions/Actions'
import SingleSkill from '../../Helpers/SingleSkill/SingleSkill'
import ProfileSkillSkelton from '../../Layouts/Skelton/ProfileSkillSkelton'

const FeedSection = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const payload = {
      page:1,
      limit: 4,
      filter: "oldest",
      sort:"createdAt"
    }
    dispatch(GetAllSkillsPaginate(payload))
  },[])

  const skillsList = useSelector(state => state.home.allFilteredSkills)?.skills

  return (
    <div className='feed-section'>
      <div className="in-container flex-column">
        {
          skillsList?.length > 0 ? skillsList?.map((skill, index) => <SingleSkill key={index} skill={skill?.skill} user={skill?.user}/>) : <ProfileSkillSkelton />
        }
      </div>
      <Footer />
    </div>
  )
}

export default FeedSection
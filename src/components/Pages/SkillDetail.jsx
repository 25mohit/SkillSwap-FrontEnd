import React, { useEffect } from 'react'
import AuthWraper from '../../Utils/Component/AuthWraper'
import Main from '../Layouts/Main/Main'
import Loading from '../../Utils/Component/Loading/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { GetSingleSkill } from '../../Redux/Actions/Actions'
import { Link, useParams } from 'react-router-dom'
import moment from 'moment'
import { BsEye, BsEyeSlash, BsFacebook, BsGithub, BsInstagram, BsLinkedin, BsStar, BsStarFill, BsStarHalf, BsTwitter } from 'react-icons/bs'

const SkillDetail = () => {
  const { skillUUID } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetSingleSkill({uuid: skillUUID}))
  },[skillUUID])

  const skillData = useSelector(state => state.home.singleSkill)
  const imageEndpoint = process.env.REACT_APP_IMAGE_ENDPOINT

  console.log("skillData", skillData,skillUUID);
  return (
    <AuthWraper>
        <Main>
          <div className="skilldetail flex-column">
            <div className="image-container">
              <img src={`${imageEndpoint}${skillData?.user?.[0]?.profile}`} alt="" />
            </div>
            <nav className='flex-column'>
              <h1><span>skill</span> {skillData?.skill?.skillName}</h1>
              <p>{skillData?.skill?.skillDescription}</p>
            </nav>
            <div className="skills-row">
              {
                skillData?.skill?.skillTechnologies?.map((skill, ind) => <span key={ind} >{skill}</span>)
              }
            </div>
           
            <div className="container">
              
              <div className="skill-detail-user flex-column">
                <div className="flex-row">
                  <h4>Skill Detail</h4>
                </div>
                <div className="flex-row">
                  <span>Created on </span>
                  <span>{moment(skillData?.skill?.createdAt).format('LL')}</span>
                </div>
                <div className="flex-row">
                  <span>Price </span>
                  <span style={{textTransform:'capitalize'}}>{skillData?.skill?.priceTerm}</span>
                </div>
                <div className="flex-row">
                  <span>Expert in skill </span>
                  <div className="level-container">                 
                      <BsStarFill id='star-icn'/>
                      <BsStarFill id='star-icn'/>
                      <BsStarFill id='star-icn'/>
                      <BsStarHalf id='star-icn'/>
                      <BsStar id='star-icn'/>
                  </div>
                </div>
                <div className="flex-row">
                  <span>Skill visiblity</span>
                    {
                        skillData?.skill?.skillVisibility === "public" ? <BsEye /> : <BsEyeSlash />
                    }   
                </div>
                <div className="flex-row">
                  <span>Updated at</span>
                  <span>{moment(skillData?.skill?.updatedAt).startOf('hour').fromNow()}</span>
                </div>
                <div className="flex-row">
                  <span>Skill swaps </span>
                  <span>{skillData?.skill?.receivedSkill} times</span>
                </div>
              </div>
              <div className="skill-detail-user flex-column">
                <div className="flex-row">
                  <h4>User Detail</h4>
                </div>
                <div className="flex-row">
                  <span>Created by </span>
                  <span>{skillData?.user?.[0]?.name}</span>
                </div>
                <div className="flex-row">
                  <span>Swaping Skills from </span>
                  <span>{moment(skillData?.user?.[0]?.createdAt).format('LL')}</span>
                </div>
                <div className="flex-row">
                  <span>Email</span>
                  <span>{skillData?.user?.[0]?.email}</span>
                </div>
                <div className="flex-row">
                  <span>Mobile</span>
                  <span>{skillData?.user?.[0]?.mobile}</span>
                </div>
                <div className="flex-row">
                  <span>Address</span>
                  <span>{skillData?.user?.[0]?.city}, {skillData?.user?.[0]?.state} ({skillData?.user?.[0]?.country})</span>
                </div>
                <div className="flex-row">
                  <span>Desgination</span>
                  <span>{skillData?.user?.[0]?.designation}</span>
                </div>
                <div className="flex-row">
                  <span>Employeer</span>
                  <span>{skillData?.user?.[0]?.employeer}</span>
                </div>
                {
                  skillData?.user?.[0]?.website !== null && 
                    <div className="flex-row">
                      <span>Website</span>
                      <span><Link to={skillData?.user?.[0]?.website} target='_blank'>Link</Link></span>
                    </div>
                }
                <div className="flex-row">
                  <span>Social Media</span>
                  <div className="flex-row">
                    { skillData?.user?.[0]?.github !== null && <Link to={skillData?.user?.[0]?.github} target='_blank'><BsGithub /></Link>}
                    { skillData?.user?.[0]?.twitter !== null && <Link to={skillData?.user?.[0]?.twitter} target='_blank'><BsTwitter /></Link>}
                    { skillData?.user?.[0]?.instagram !== null && <Link to={skillData?.user?.[0]?.instagram} target='_blank'><BsInstagram /></Link>}
                    { skillData?.user?.[0]?.facebook !== null && <Link to={skillData?.user?.[0]?.facebook} target='_blank'><BsFacebook /></Link>}
                    { skillData?.user?.[0]?.linkedin !== null && <Link to={skillData?.user?.[0]?.linkedin} target='_blank'><BsLinkedin /></Link>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Main>
    </AuthWraper>
  )
}

export default SkillDetail
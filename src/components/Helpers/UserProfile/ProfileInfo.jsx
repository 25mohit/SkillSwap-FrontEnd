import { BsFacebook, BsGithub, BsGlobe, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs'
import { RiEditCircleFill } from 'react-icons/ri'
import { CgUserlane } from 'react-icons/cg'
import CardLayout from '../../Layouts/CardLayout/CardLayout'
import { Link } from "react-router-dom"
import ProfileUpdate from '../../Forms/ProfileUpdate/ProfileUpdate'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetProfile, SaveAPIResponse } from '../../../Redux/Actions/Actions'

const ProfileInfo = () => {
  const [showProfileUpdate, setShowProfileUpdate] = useState(false)
  const [showUserName, setShowUserName] = useState(false)

  const imageEndpoint = process.env.REACT_APP_IMAGE_ENDPOINT
  
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(GetProfile())
  },[])

  const profieData = useSelector(state => state.home.profile)
  const response = useSelector(state => state.home.APIRESPONSE)

  useEffect(() => {
    if(response?.status){
      dispatch(SaveAPIResponse({}))
      dispatch(GetProfile())
    }
  },[response])

  return (
    <CardLayout type="profleInfo">
      {showProfileUpdate && <ProfileUpdate updateData={profieData?.data} onClose={setShowProfileUpdate}/>}
      <div className="image">
        {
          profieData?.data?.profile !== '' && profieData?.data?.profile !== null ? <img src={`${imageEndpoint}${profieData?.data?.profile}`} className='emptyUser' />
                : <img src="../Assets/Image/images.png" className='emptyUser' />
        }
        <CgUserlane id='username_icon' onMouseLeave={() => setShowUserName(false)} onMouseEnter={() => setShowUserName(true)}/>
        <span className={`user-name-tooltip ${showUserName ? 'visiable':'hide'}`}>@{profieData?.data?.userName}</span>
      </div>
      <section className="info-ct flex-column">
        <div className="flex-row">
          <h3>Profile </h3>
          <span>{profieData?.data?.designation && <>( {profieData?.data?.designation} ) </>}</span>
        </div>
        <div className='info-container flex-column'>
          <div className='flex-between'>
            <p>{profieData?.data?.name}</p>
            <p>{profieData?.data?.mobile}</p>
          </div>
          <div className='flex-between'>
            <p>{profieData?.data?.email}</p>
          </div>
          <div className='flex-between'>
            <p>{profieData?.data?.employeer}</p>
            {/* <p>You have 6 Skills</p> */}
          </div>
          <div className='flex-between'>
            <p>{profieData?.data?.city}, {profieData?.data?.state} &nbsp;<b>({profieData?.data?.country})</b></p>
          </div>
          <div className="social-media-container">
            {profieData?.data?.github && <Link target='_blank' to={profieData?.data?.github}><BsGithub id='social-icn'/></Link>}
            {profieData?.data?.instagram && <Link target='_blank' to={profieData?.data?.instagram}><BsInstagram id='social-icn'/></Link>}
            {profieData?.data?.twitter && <Link target='_blank' to={profieData?.data?.twitter}><BsTwitter id='social-icn'/></Link>}
            {profieData?.data?.facebook && <Link target='_blank' to={profieData?.data?.facebook}><BsFacebook id='social-icn'/></Link>}
            {profieData?.data?.linkedin && <Link target='_blank' to={profieData?.data?.linkedin}><BsLinkedin id='social-icn'/></Link>}
            {profieData?.data?.website && <Link target='_blank' to={profieData?.data?.website}><BsGlobe id='social-icn'/></Link>}
          </div>
          <footer>
            <RiEditCircleFill id='icon-primary' onClick={() => setShowProfileUpdate(true)}/>
          </footer>
        </div>
      </section>
    </CardLayout>
  )
}

export default ProfileInfo
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BsFacebook, BsGithub, BsGlobe, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs'
import SkillDetailRow from '../../Helpers/UserProfile/SkillDetailRow'
import { useDispatch, useSelector } from 'react-redux'
import { GetPublicProfile } from '../../../Redux/Actions/Actions'
import AuthWraper from '../../../Utils/Component/AuthWraper'
import Main from '../../Layouts/Main/Main'

const PublicProfileV2 = () => {
   
    // alert("Hit")
    const {userProfile} = useParams()
    const dispatch = useDispatch()
    
    useEffect(() => {
        if(userProfile !== ''){
            dispatch(GetPublicProfile(userProfile))
        }
    },[])

    const profileData = useSelector(state => state.home.publicProfileData)


  return (
    // <AuthWraper>
        // <Main>
            <div className="public-profile-container" >
                <div className="body">
                    <div className="image">
                        <img src="../Assets/Image/myImage.jpg" alt="" />
                    </div>
                    <div className="flex-row">
                        <div className="div">
                            <p><b>{profileData?.user?.name}</b></p>
                        </div>
                        <div className="div">
                            <span>@{profileData?.user?.userName}</span>
                        </div>
                    </div>
                    {profileData?.user?.employeer && <div className="flex-row">
                        <div className="div">
                            <p>{profileData?.user?.designation}</p>
                        </div>
                        <div className="div">
                            <p>{profileData?.user?.employeer}</p>
                        </div>
                    </div>}
                    <div className="flex-row">
                        <div className="div">
                            <p>{profileData?.user?.mobile}</p>
                        </div>
                        <div className="div">
                            <p>{profileData?.user?.email}</p>
                        </div>
                    </div>
                    <div className="flex-row">
                        <div className="div">
                            <p>{profileData?.user?.city}, {profileData?.user?.state} ({profileData?.user?.country})</p>
                        </div>
                    </div>
                    <div className="social-media-container">
                        {profileData?.user?.github && <Link target='_blank' to={profileData?.user?.github}><BsGithub id='social-icn'/></Link>}
                        {profileData?.user?.instagram && <Link target='_blank' to={profileData?.user?.instagram}><BsInstagram id='social-icn'/></Link>}
                        {profileData?.user?.twitter && <Link target='_blank' to={profileData?.user?.twitter}><BsTwitter id='social-icn'/></Link>}
                        {profileData?.user?.facebook && <Link target='_blank' to={profileData?.user?.facebook}><BsFacebook id='social-icn'/></Link>}
                        {profileData?.user?.linkedin && <Link target='_blank' to={profileData?.user?.linkedin}><BsLinkedin id='social-icn'/></Link>}
                        {profileData?.user?.website && <Link target='_blank' to={profileData?.user?.website}><BsGlobe id='social-icn'/></Link>}
                    </div>
                </div>
                <div className="body">
                    <h3>Skills</h3>
                    {
                        profileData!== undefined && profileData !== null && profileData?.skills?.map((skill, inde) => <SkillDetailRow key={inde} heading={skill?.skillName} skills={skill} publicShow={true}/>)
                    }
                </div>
            </div>
        // </Main>
    // </AuthWraper>
  )
}

export default PublicProfileV2
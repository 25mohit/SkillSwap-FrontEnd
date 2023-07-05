import React, { useEffect, useState } from 'react'
import Input from '../../../Utils/Component/Form/Input'
import { useDispatch, useSelector } from 'react-redux'
import { BiSolidUserCircle } from 'react-icons/bi'
import { NotificationHandler, UpdateUserProfile, UploadMedia } from '../../../Redux/Actions/Actions'
import axios from 'axios'

const ProfileUpdate = ({ onClose, updateData }) => {
    const [profileData, setProfileData] = useState({})
    const [error, setError] = useState('')
    const [userProfile, setUserProfile] = useState('')

    const imageEndpoint = process.env.REACT_APP_IMAGE_ENDPOINT
    
    const onChangeHandler = e => {
        const {name , value} = e.target
        setProfileData({...profileData, [name]:value})
    }

    const dispatch = useDispatch()
    const response = useSelector(state => state.home.APIRESPONSE)

    useEffect(() => {
        if(response && Object.keys(response).length > 0){
            if(response.status){
                onClose(false)
            }
        }
    },[response])

    useEffect(() =>{
        if(updateData && Object.keys(updateData).length > 0){
            setProfileData({...updateData, 
                github: updateData?.github?.split('https://www.github.com/')?.[1],
                instagram: updateData?.instagram?.split('https://www.instagram.com/')?.[1],
                twitter: updateData?.twitter?.split('https://www.twitter.com/')?.[1],
                linkedin: updateData?.linkedin?.split('https://www.linkedin.com/in/')?.[1],
                facebook: updateData?.facebook?.split('https://www.facebook.com/')?.[1],
                website: updateData?.website?.split(`https://www.`)?.[1],
            })
            setUserProfile(`${updateData?.profile}`)
        }
    },[updateData])
    
    const [userImage, setUserImage] = useState()
    const [ImageResponse, setImageResponse] = useState({})

    const clearImage = () => {
        setUserImage()
        setImageResponse({})
        setUserProfile('')
    }

    const onImageUpload = e => {
        setUserImage(URL.createObjectURL(e.target.files[0]))
        const formData = new FormData()
        const file = e.target.files[0];
        formData.append('file', file)
        axios.post('http://localhost:5656/upload/I', formData)
                .then(res => {
                    dispatch(NotificationHandler({status: true, message: res?.data?.message}))
                    setImageResponse(res?.data)
                }
                    )
                .catch(err => {
                    dispatch(NotificationHandler({status: true, message: err?.response?.data?.message, type: 'danger'}))
                })
        // dispatch(UploadMedia(formData))
    }

    useEffect(() => {
        if(ImageResponse && Object.keys(ImageResponse).length > 0){
            if(ImageResponse?.status){
                setProfileData({...profileData, profile: ImageResponse?.file})
            }
        }
    },[ImageResponse])

    const onUpdateHandler = e => {
        e.preventDefault()
        if(profileData.github && profileData.instagram && profileData.twitter && profileData.facebook && profileData.website && profileData.linkedin){
            setError('You can add max 5 social media handles')
            return false
        } else {
            dispatch(UpdateUserProfile(profileData))
        }
    }

  return (
    <div className='modal-main' onClick={() => onClose(false)}>
        <div className="container flex-column" onClick={e => e.stopPropagation()}>
            <div className="image">
                <input type="file" onChange={onImageUpload}/>
                {(userProfile === '' ||userProfile === undefined || userProfile === null )&& userImage === undefined ? <BiSolidUserCircle id='empty-user'/>
                : <img src={userImage !== undefined ? userImage : `${imageEndpoint}${userProfile}`} alt="" onClick={clearImage}/>}
                {/* <img className='img' src='https://skillswap-user-i.s3.ap-south-1.amazonaws.com/69a196ef-0b59-4bff-8b17-ff449f2f3503-Game.png' alt="" id='empty-user'/> */}
            </div>
            <form action="post">
                <Input onChange={onChangeHandler} name="userName" value={profileData?.userName} type="text" placeholder="Enter your user name"/>
                <Input onChange={onChangeHandler} name="designation" value={profileData?.designation} type="text" placeholder="Enter your designation"/>
                <Input onChange={onChangeHandler} name="employeer" value={profileData?.employeer} type="text" placeholder="Enter your employeer name"/>
                <div className="flex-row">
                    <div className="div">
                        <Input onChange={onChangeHandler} name="country" value={profileData?.country} type="text" placeholder="Country"/>
                    </div>
                    <div className="div">
                        <Input onChange={onChangeHandler} name="state" value={profileData?.state} type="text" placeholder="State"/>
                    </div>
                </div>
                <div className="flex-row">
                    <div className="div">
                        <Input onChange={onChangeHandler} name="city" value={profileData?.city} type="text" placeholder="City"/>
                    </div>
                    <div className="div">
                        <Input onChange={onChangeHandler} name="mobile" value={profileData?.mobile} type="number" placeholder="Mobile" min={0}/>
                    </div>
                </div>
                <div className="flex-row">
                    <div className="div">
                        <Input onChange={onChangeHandler} name="github" value={profileData?.github} type="text" placeholder="GitHub"/>
                    </div>
                    <div className="div">
                        <Input onChange={onChangeHandler} name="instagram" value={profileData?.instagram} type="text" placeholder="Instagram"/>
                    </div>
                </div>
                <div className="flex-row">
                    <div className="div">
                        <Input onChange={onChangeHandler} name="twitter" value={profileData?.twitter} type="text" placeholder="Twitter"/>
                    </div>
                    <div className="div">
                        <Input onChange={onChangeHandler} name="facebook" value={profileData?.facebook} type="text" placeholder="Facebook"/>
                    </div>
                </div>
                <div className="flex-row">
                    <div className="div">
                        <Input onChange={onChangeHandler} name="website" value={profileData?.website} type="text" placeholder="Website"/>
                    </div>
                    <div className="div">
                        <Input onChange={onChangeHandler} name="linkedin" value={profileData?.linkedin} type="text" placeholder="Linkedin"/>
                    </div>
                </div>
                {error !== '' && <span className='error-text'>{error}</span>}
                <button className="btn-primary" onClick={onUpdateHandler}>Update</button>
            </form>
        </div>
    </div>
  )
}

export default ProfileUpdate
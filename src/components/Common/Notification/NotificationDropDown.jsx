import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetNotifications } from '../../../Redux/Actions/Actions'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

const NotificationDropDown = ({ showNotification, setShowNotification, notifications }) => {

    const imageEndpoint = process.env.REACT_APP_IMAGE_ENDPOINT
    
    const navigate = useNavigate()

    const redirectToNotificationPage = () => {
        navigate('/profile/notification')
    }

  return (
    <div className={`modal-drop ${showNotification ? 'show' : 'hide'} flex-column`} onMouseEnter={() => setShowNotification(true)} onMouseLeave={() => setShowNotification(false)} >
        {
            notifications?.length > 0 ? notifications?.map((noti, inde) =>
                <div className="single-notification" key={inde} onClick={redirectToNotificationPage}>
                    <img src={`${imageEndpoint}${noti?.profile}`} alt="" loading='lazy'/>
                    <section className="content flex-column">
                        <div className="flex-between asdasdadad">
                            <div className='h4-head'><>{noti?.message?.slice(0, noti?.message?.length -1)}  for your</><b>{noti?.skillDetails?.skillName} skill </b></div>
                            <div className="flex" style={{alignItems:'center', gap:'0.6rem'}}>
                                <span className='time-stamp-with-bg'>{moment(noti?.requestTime).startOf('minutes').fromNow()}</span>
                                <span className={noti?.status === 'pending' && 'pending' || noti?.status === 'accepted' && 'accepted' || noti?.status === 'rejected' && 'rejected'}>{noti?.status}</span>
                            </div>
                            
                        </div>
                        <p>By {noti?.senderName}, for {noti?.senderSkillNameReqForSwaping} skill</p>
                    </section>
                </div>
            ) : <span className='empty'>No New Notification</span>
        }
    </div>
  )
}

export default NotificationDropDown
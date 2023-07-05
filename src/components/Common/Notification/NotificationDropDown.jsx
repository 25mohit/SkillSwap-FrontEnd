import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetNotifications } from '../../../Redux/Actions/Actions'
import moment from 'moment'

const NotificationDropDown = ({ showNotification, setShowNotification }) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(GetNotifications())
    },[])

    const imageEndpoint = process.env.REACT_APP_IMAGE_ENDPOINT
    const notifications = useSelector(state => state.home.notifications)
    
  return (
    <div className={`modal-drop ${showNotification ? 'show' : 'hide'} flex-column`} onMouseEnter={() => setShowNotification(true)} onMouseLeave={() => setShowNotification(false)}>
        {
            notifications?.length > 0 ? notifications?.map((noti, inde) =>
                <div className="single-notification" key={inde}>
                    <img src={`${imageEndpoint}${noti?.profile}`} alt="" loading='lazy'/>
                    <section className="content flex-column">
                        <div className="flex-between">
                            <h4><b>{noti?.message}</b></h4>
                            <span>{moment(noti?.requestTime).startOf('hour').fromNow()}</span>
                        </div>
                        <p>By {noti?.senderName}, for {noti?.skillDetails?.skillName}</p>
                    </section>
                </div>
            ) : <span className='empty'>No New Notification</span>
        }
    </div>
  )
}

export default NotificationDropDown
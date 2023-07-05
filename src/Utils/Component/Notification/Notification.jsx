import { useDispatch, useSelector } from "react-redux"
import { NotificationHandler } from "../../../Redux/Actions/Actions";
import { useEffect, useState } from "react";

const Notification = () => {

    const [message, setMessage] = useState('')
    const [notificationType, setNotificationType] = useState('')

    const dispatch = useDispatch()
    const notificationState = useSelector(state => state.home.notification)

    useEffect(() => {
        if(notificationState?.status){
            setNotificationType(notificationState?.type)
            setMessage(notificationState?.message)
            setTimeout(() => {
                dispatch(NotificationHandler({}))
            },5000)
            setTimeout(() => {
                setNotificationType('')
            },5400)
        }
    },[notificationState])
    
    const onHidehandler = () => {
        dispatch(NotificationHandler({}))
    }

  return (
    <div className={`notification-UI ${notificationState?.status ? 'visiable' : 'hidden'} `} id={`${notificationType === 'danger' ? 'danger' : 'success'}`} onClick={onHidehandler}>
        <div className="bar"></div>
        <p className="notification-message">{message}</p>
    </div>
  )
}

export default Notification
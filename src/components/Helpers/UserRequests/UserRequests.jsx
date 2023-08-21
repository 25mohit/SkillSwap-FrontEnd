import React, { useEffect } from 'react'
import ProfileLayout from '../../Layouts/ProfileLayout/ProfileLayout'
import CardLayout from '../../Layouts/CardLayout/CardLayout'
import { useDispatch, useSelector } from 'react-redux'
import { GetNotifications } from '../../../Redux/Actions/Actions'
import NotificationBar from './NotificationBar'

const UserRequests = () => {
  document.title = "SkillSwap | Notifications"
  const dispatch = useDispatch()
  
  useEffect(() => {
      dispatch(GetNotifications())
  },[])

  const notifications = useSelector(state => state.home.notifications)

  return (
    <ProfileLayout>
        <div className="skill-control-header flex-between">
          <div className='flex'>
            <h2 className='heading-main'>Notifications</h2>
          </div>
        </div>
        <CardLayout>
        <div className="user-request flex-column">
          {
            notifications && Object.keys(notifications).length > 0 && notifications?.map((notify, index) => <NotificationBar key={index} data={notify}/>)
          }
        </div>
          
        </CardLayout>
    </ProfileLayout>
  )
}

export default UserRequests
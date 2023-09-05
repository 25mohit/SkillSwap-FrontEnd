import { Link } from 'react-router-dom'
import { BsFillBellFill } from 'react-icons/bs'
import { ImHome } from 'react-icons/im'
import { FaRegUser } from 'react-icons/fa'
import { GrLogout } from 'react-icons/gr'
import { CiMenuKebab } from 'react-icons/ci'
import NotificationDropDown from '../Notification/NotificationDropDown'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetNotifications } from '../../../Redux/Actions/Actions'

const Navbar = ({ onChange, toogle }) => {
  const isLoggedIn = Boolean(localStorage.getItem('loggedIn'))

  const onLogoutHandler = () => {
    window.location.href = '/login'
    localStorage.clear()
  }

  const [showNotification, setShowNotification] = useState(false)

  const dispatch = useDispatch()

  const notifications = useSelector(state => state.home.notifications)

  useEffect(() => {
    if(showNotification && Object.keys(notifications)?.length == 0){
      dispatch(GetNotifications())
    }
  },[showNotification])

  const pendingNotification = notifications && Object.keys(notifications).length > 0 && 
    notifications?.filter(notification => notification.status === "pending")
    .map(notification => notification.status)

  return (
    <div className="navbar flex-between">
      <div className="flex-row">
        {window.location.href?.split('/')?.[3] === 'profile' && <CiMenuKebab onClick={() => onChange(!toogle)} id='nav-icon'/>}
        <Link to='/'>
          <h2 className="main-logo">SkillSwap</h2> &nbsp;<b>BETA</b>
        </Link>
      </div>
      <div className="link-group">
        Hi, {localStorage.getItem('user-name')?.split(' ')?.[0]}
        <span  id='notification-icon' ><BsFillBellFill onMouseEnter={() => setShowNotification(true)} onMouseLeave={() => setShowNotification(false)} />
          {pendingNotification?.length > 0 && <div className="new-notify">{pendingNotification?.length}</div>}
          <NotificationDropDown notifications={notifications} showNotification={showNotification} setShowNotification={setShowNotification}/>
        </span>          
        <Link to="/home">Home</Link>
        <Link to="/profile/user">Profile</Link>
        {
          isLoggedIn ? <span onClick={onLogoutHandler} className='link'>Logout</span> : null
        }
      </div>
      <div className="flex-row mobile">
        <Link to='/home'><ImHome /></Link>
        <Link to='/profile/user'><FaRegUser /></Link>
        <span onClick={onLogoutHandler} className='link'><GrLogout /></span>
      </div>
    </div>
  )
}

export default Navbar
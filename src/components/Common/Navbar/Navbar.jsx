import { Link } from 'react-router-dom'
import { BsFillBellFill } from 'react-icons/bs'
import { CiMenuKebab } from 'react-icons/ci'
import NotificationDropDown from '../Notification/NotificationDropDown'
import { useState } from 'react'

const Navbar = ({ onChange, toogle }) => {
  const isLoggedIn = Boolean(localStorage.getItem('loggedIn'))

  const onLogoutHandler = () => {
    window.location.href = '/login'
    localStorage.clear()
  }

  const [showNotification, setShowNotification] = useState(false)

  return (
    <div className="navbar flex-between">
      <div className="flex-row">
        <CiMenuKebab onClick={() => onChange(!toogle)} id='nav-icon'/>
        <Link to='/'>
          <h2 className="main-logo">SkillSwap</h2>
        </Link>
      </div>
      <div className="link-group flex">
        <span  id='notification-icon' ><BsFillBellFill onMouseEnter={() => setShowNotification(true)} onMouseLeave={() => setShowNotification(false)} />
          <NotificationDropDown showNotification={showNotification} setShowNotification={setShowNotification}/>
        </span>          
        <Link to="/home">Home</Link>
        <Link to="/profile/user">Profile</Link>
        {
          isLoggedIn ? <span onClick={onLogoutHandler} className='link'>Logout</span> : null
        }
      </div>
    </div>
  )
}

export default Navbar
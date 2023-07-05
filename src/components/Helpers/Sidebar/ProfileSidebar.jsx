import {GiRamProfile} from 'react-icons/gi'
import {ImBooks} from 'react-icons/im'
import {BiSupport} from 'react-icons/bi'
import {BsFillBookmarkStarFill} from 'react-icons/bs'
import {LuSettings} from 'react-icons/lu'
import {PiGitPullRequestLight} from 'react-icons/pi'
import { Link } from 'react-router-dom'

const ProfileSidebar = () => {
  return (
    <div className='profile-sidebar flex-column'>
        <Link to="user" ><span className="link-btn" ><GiRamProfile />Profile</span></Link>
        <Link to="skills" ><span className="link-btn" ><ImBooks />Skills</span></Link>
        <Link to="requests" ><span className="link-btn" ><PiGitPullRequestLight /> Requests</span></Link>
        <Link to="bookmark" ><span className="link-btn" ><BsFillBookmarkStarFill />bookmark</span></Link>
        <Link to="support" ><span className="link-btn" ><BiSupport />Support</span></Link>
        <Link to="settings" ><span className="link-btn" ><LuSettings />Settings</span></Link>
    </div>
  )
}

export default ProfileSidebar
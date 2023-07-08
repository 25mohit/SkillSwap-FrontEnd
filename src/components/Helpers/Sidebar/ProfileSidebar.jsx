import { Link } from 'react-router-dom'

const ProfileSidebar = ({ sidebarData }) => {
  return (
    <div className='profile-sidebar flex-column'>
      {
        sidebarData?.map((sidebar, index) => <Link to={sidebar?.link} ><span className="link-btn" key={index}>{sidebar?.icon}{sidebar?.label}</span></Link>)
      }
        
        {/* <Link to="skills" ><span className="link-btn" ><ImBooks />Skills</span></Link>
        <Link to="requests" ><span className="link-btn" ><PiGitPullRequestLight /> Requests</span></Link>
        <Link to="bookmark" ><span className="link-btn" ><BsFillBookmarkStarFill />bookmark</span></Link>
        <Link to="support" ><span className="link-btn" ><BiSupport />Support</span></Link>
        <Link to="settings" ><span className="link-btn" ><LuSettings />Settings</span></Link> */}
    </div>
  )
}

export default ProfileSidebar
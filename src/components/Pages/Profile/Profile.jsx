import AuthWraper from '../../../Utils/Component/AuthWraper'
import MobileSidebar from '../../Helpers/MobileSidebar/MobileSidebar'
import ProfileSidebar from '../../Helpers/Sidebar/ProfileSidebar'
import Main from '../../Layouts/Main/Main'
import { Outlet } from 'react-router-dom'
import {GiRamProfile} from 'react-icons/gi'
import {ImBooks} from 'react-icons/im'
import {BiSupport} from 'react-icons/bi'
import {BsFillBookmarkStarFill} from 'react-icons/bs'
import {LuSettings} from 'react-icons/lu'
import {PiGitPullRequestLight} from 'react-icons/pi'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Profile = () => {
  
  const sidebarData = [
    {
      label: 'Profile',
      link:'user',
      icon: <GiRamProfile />
    },
    {
      label: 'Skills',
      link:'skills',
      icon: <ImBooks />
    },
    {
      label: 'Requests',
      link:'requests',
      icon: <PiGitPullRequestLight />
    },
    {
      label: 'Bookmarks',
      link:'bookmark',
      icon: <BsFillBookmarkStarFill />
    }
  ]

  const [toogleBar, setToogleBar] = useState(false)

  return (
    <AuthWraper>
      <Main onChange={setToogleBar} toogle={toogleBar}>
          <div className="profile flex-between">
            <MobileSidebar sidebarData={sidebarData}  onChange={setToogleBar} toogle={toogleBar}/>
            <ProfileSidebar sidebarData={sidebarData}/>
              <Outlet />
          </div>
      </Main>
    </AuthWraper>
  )
}

export default Profile
import AuthWraper from '../../../Utils/Component/AuthWraper'
import MobileSidebar from '../../Helpers/MobileSidebar/MobileSidebar'
import ProfileSidebar from '../../Helpers/Sidebar/ProfileSidebar'
import Main from '../../Layouts/Main/Main'
import { Outlet, useNavigate } from 'react-router-dom'
import {GiRamProfile} from 'react-icons/gi'
import {ImBooks} from 'react-icons/im'
import {BsFillBookmarkStarFill} from 'react-icons/bs'
import { useEffect, useState } from 'react'
import { AiFillNotification } from 'react-icons/ai'

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
      label: 'Notification',
      link:'notification',
      icon: <AiFillNotification />
    },
    {
      label: 'Bookmarks',
      link:'bookmark',
      icon: <BsFillBookmarkStarFill />
    }
  ]

  const [toogleBar, setToogleBar] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if(window.location.href?.split('/')?.length===4){
      navigate('/profile/user')
    }
  },[])

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
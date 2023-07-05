import AuthWraper from '../../../Utils/Component/AuthWraper'
import ProfileSidebar from '../../Helpers/Sidebar/ProfileSidebar'
import Main from '../../Layouts/Main/Main'
import { Outlet } from 'react-router-dom'

const Profile = () => {
  
  return (
    <AuthWraper>
      <Main>
          <div className="profile flex-between">
              <ProfileSidebar />
              <Outlet />
          </div>
      </Main>
    </AuthWraper>
  )
}

export default Profile
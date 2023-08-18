import Main from '../../Layouts/Main/Main'
import AuthWraper from '../../../Utils/Component/AuthWraper'
import Sidebar from "../../Common/Sidebar/Sidebar"
import FeedSection from '../../Common/FeedSection/FeedSection'
import { useDispatch } from 'react-redux'
import { GetNotifications } from '../../../Redux/Actions/Actions'
import { useEffect } from 'react'

const Home = () => {
  document.title = "SkillSwap"
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetNotifications())
  },[])

  return (
    <AuthWraper>
      <Main>
        <div className="home flex-column">
          <div className="container">
            <Sidebar />
            <FeedSection />
          </div>
        </div>
      </Main>
    </AuthWraper>
  )
}

export default Home
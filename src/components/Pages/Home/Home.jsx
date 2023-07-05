import Main from '../../Layouts/Main/Main'
import AuthWraper from '../../../Utils/Component/AuthWraper'
import Sidebar from "../../Common/Sidebar/Sidebar"
import FeedSection from '../../Common/FeedSection/FeedSection'

const Home = () => {
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
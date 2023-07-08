import { Route, Routes } from "react-router-dom"
// import Landing from '../components/Pages/Landing/Landing'
// import Home from '../components/Pages/Home/Home'
// import Login from "../components/Pages/Login/Login"
// import Registration from "../components/Pages/Registration/Registration"
// import Profile from "../components/Pages/Profile/Profile"
// import AddSkill from "../components/Pages/AddSkill/AddSkill"
// import UserProfile from "../components/Helpers/UserProfile/UserProfile"
// import UserSkills from "../components/Helpers/UserSkills/UserSkills"
// import PublicProfile from "../components/Pages/PublicProfile/PublicProfile"
import UserRequests from "../components/Helpers/UserRequests/UserRequests"
import UserSupport from "../components/Helpers/UserSupport/UserSupport"
import UserSettings from "../components/Helpers/UserSettings/UserSettings"
import UserBookmark from "../components/Helpers/UserBookmark/UserBookmark"
// import SkillDetail from "../components/Pages/SkillDetail"
import { Suspense, lazy } from "react"
// import PublicProfileV2 from "../components/Pages/PublicProfileV2/PublicProfileV2"
import Loading from "./Component/Loading/Loading"

const RoutesContainer = () => {
  const Landing = lazy(() => import('../components/Pages/Landing/Landing'))
  const Login = lazy(() => import("../components/Pages/Login/Login"))
  const Registration = lazy(() => import("../components/Pages/Registration/Registration"))
  const Home = lazy(() => import('../components/Pages/Home/Home'))
  const Profile = lazy(() => import("../components/Pages/Profile/Profile"))
  const AddSkill = lazy(() => import("../components/Pages/AddSkill/AddSkill"))
  const UserProfile = lazy(() => import("../components/Helpers/UserProfile/UserProfile"))
  const UserSkills = lazy(() => import("../components/Helpers/UserSkills/UserSkills"))
  const PublicProfileV2 = lazy(() => import("../components/Pages/PublicProfileV2/PublicProfileV2"))
  const SkillDetail = lazy(() => import("../components/Pages/SkillDetail"))

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
          <Route path="/" exact element={<Landing />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Registration />} />
          <Route path="/home" exact element={<Home />} />
          <Route path="/profile" exact element={<Profile />} >
            <Route path="user" exact element={<UserProfile />} />
            <Route path="skills" exact element={<UserSkills />} />
            <Route path="requests" exact element={<UserRequests />} />
            <Route path="support" exact element={<UserSupport />} />
            <Route path="bookmark" exact element={<UserBookmark />} />
            <Route path="settings" exact element={<UserSettings />} />
          <Route path="skills/:actionMode" exact element={<AddSkill />} />
          </Route>
          <Route path="/skill/detail/:skillUUID" exact element={<SkillDetail />} />
          <Route path="/u/:userProfile" exact element={<PublicProfileV2 />} />
      </Routes>
    </Suspense>
  )
}

export default RoutesContainer
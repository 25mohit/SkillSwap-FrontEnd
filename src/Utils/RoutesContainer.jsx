import { Route, Routes } from "react-router-dom"
import UserRequests from "../components/Helpers/UserRequests/UserRequests"
import { Suspense, lazy } from "react"
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
  const UserBookmark = lazy(() => import("../components/Helpers/UserBookmark/UserBookmark"))
  const TermsAndConditions = lazy(() => import("../components/Pages/Terms&Conditions/Terms&Conditions"))

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
            <Route path="bookmark" exact element={<UserBookmark />} />
          <Route path="skills/:actionMode" exact element={<AddSkill />} />
          </Route>
          <Route path="/skill/detail/:skillUUID" exact element={<SkillDetail />} />
          <Route path="/u/:userProfile" exact element={<PublicProfileV2 />} />
          <Route path="/terms-and-conditions" exact element={<TermsAndConditions />} />
      </Routes>
    </Suspense>
  )
}

export default RoutesContainer
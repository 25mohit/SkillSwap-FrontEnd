import HeroLayout from '../../Layouts/HeroLayout/HeroLayout'
import Navbar from '../../Common/Navbar/Navbar'

const Landing = () => {
  
  const isLoggedIn = Boolean(localStorage.getItem('loggedIn'))

  return (
    <div className="landing-page">
      { isLoggedIn && <Navbar /> }  
      <HeroLayout />
    </div>
  )
}

export default Landing
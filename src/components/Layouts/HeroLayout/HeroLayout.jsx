import { Link } from 'react-router-dom'

const HeroLayout = () => {

  const isLoggedIn = Boolean(localStorage.getItem('loggedIn'))

  return (
    <div className='hero-layout flex-between'>
      <div className="content flex-column">
        <h1>Unlock Your Potential with SkillSwap</h1>
        <p>Join a vibrant community of learners and experts on SkillSwap. Discover new skills, exchange knowledge, and broaden your horizons. Connect with like-minded individuals and embark on a journey of growth and collaboration. Start your skill-sharing adventure today!</p>
      </div>
      <div className="action-btn flex">
        <Link to={isLoggedIn ? 'profile/user' : 'login'}><button className='btn-primary'>Start Today</button></Link>
      </div>
    </div>
  )
}

export default HeroLayout
import RegistrationForm from '../../Forms/Registration/RegistrationForm'
import LoginContent from '../Login/LoginContent'

const Registration = () => {
  return (
    <div className="form">
      <div className="left">
        <RegistrationForm />
      </div>
      <div className="right">
        <LoginContent />
      </div>
    </div>
  )
}

export default Registration
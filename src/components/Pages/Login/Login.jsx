import LoginForm from "../../Forms/Login/LoginForm"
import LoginContent from "./LoginContent"

const Login = () => {
  return (
    <div className="form">
      <div className="left">
        <LoginForm />
      </div>
      <div className="right">
        <LoginContent />
      </div>
    </div>
  )
}

export default Login
import { AiOutlineDoubleLeft } from "react-icons/ai"
import { BsFillCaretLeftFill } from "react-icons/bs"
import { Link, useNavigate } from "react-router-dom"

const Form = props => {

  const navigate = useNavigate()

  const onBackHandler = () =>{
    navigate(props?.onBack.link)
  }
  return (
    <form  action='post' className='auth-form' style={{ width: props?.width !== undefined ? props?.width : null}}>
        <div className="nav">
          {props.onBack?.show ? <AiOutlineDoubleLeft id="back-icon" onClick={onBackHandler}/> : null }
            <h2>{props?.heading}</h2>
            <Link to='/' className="form-hd-txt">Skill Swap</Link>
        </div>
        {props.children}
    </form>
  )
}

export default Form
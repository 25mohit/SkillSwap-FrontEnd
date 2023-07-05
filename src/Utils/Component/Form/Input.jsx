
const Input = props => {

  const getSmallProfileStyle = () => {
    if(props.size==="small"){
      return true
    } else {
      return null
    }
}

  return (
    <div className={`input-wrapper ${props.error ? 'error' : ''}`}>
        <input {...props} placeholder={null} required className={`input-field ${getSmallProfileStyle() ?  'small' : ''} `}/>
        <label htmlFor={props?.name} className={`input-placeholder ${getSmallProfileStyle() ?  'small' : ''}`}>{props.placeholder}</label>
    </div>
  )
}

export default Input
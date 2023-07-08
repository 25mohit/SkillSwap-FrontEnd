import Navbar from "../../Common/Navbar/Navbar"

const Main = props => {
  return (
    <div className='main-layout'>
      <Navbar onChange={props?.onChange} toogle={props.toogle}/>
      {props.children}
    </div>
  )
}

export default Main
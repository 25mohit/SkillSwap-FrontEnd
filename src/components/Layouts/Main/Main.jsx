import Navbar from "../../Common/Navbar/Navbar"

const Main = props => {
  return (
    <div className='main-layout'>
      <Navbar />
      {props.children}
    </div>
  )
}

export default Main
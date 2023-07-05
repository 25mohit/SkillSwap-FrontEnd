import moment from 'moment'
import { BsFillBookmarkHeartFill, BsGithub, BsGlobe, BsInstagram } from 'react-icons/bs'
import { PiDotOutlineDuotone } from 'react-icons/pi'
import { Link } from 'react-router-dom'

const SingleSkill = ({ user, skill}) => {
    
    const imageEndpoint = process.env.REACT_APP_IMAGE_ENDPOINT

  return (
    <div className='single-skill'>
        <BsFillBookmarkHeartFill id='book'/>
        <div className="image">
            <img src={`${imageEndpoint}${user?.profile}`} alt="" loading='lazy'/>
        </div>
        <div className="container flex-column">
            <div className="row">
                <p className="name">{user?.userName}</p>
                <PiDotOutlineDuotone />
                {/* <span>5 skills</span>
                <PiDotOutlineDuotone /> */}
                <span>since {moment(user?.userCreatedOn).format('LL')}</span>
                <PiDotOutlineDuotone />
                <span>Listed on {moment(skill?.createdAt).format('LL')}</span>
                <PiDotOutlineDuotone />
                <div >
                    <Link to={user?.socialMedia?.instagram} target='_blank'><BsInstagram /></Link>
                    <Link to={user?.socialMedia?.github} target='_blank'><BsGithub /></Link>
                    <Link to={user?.socialMedia?.website} target='_blank'><BsGlobe /></Link>
                </div>
            </div>
            <div className="row-2">
                <p className='heading'>{skill?.skillName}</p>
                <p className="description">{skill?.skillDescription}</p>
            </div>
            <div className="row">
                <span className="link">Open</span>
                <span className="link">Send Swap Request</span>
            </div>
        </div>
    </div>
  )
}

export default SingleSkill
import moment from 'moment'
import { BsFillBookmarkHeartFill, BsGithub, BsGlobe, BsInstagram } from 'react-icons/bs'
import { PiDotOutlineDuotone } from 'react-icons/pi'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { AddBookmark } from '../../../Redux/Actions/Actions'

const SingleSkill = ({ user, skill}) => {
    
    const imageEndpoint = process.env.REACT_APP_IMAGE_ENDPOINT

    const naviagte = useNavigate()
    const dispatch = useDispatch()

    const onOpenHandler = () => {
        naviagte(`/skill/detail/${skill?._id}`)
    }

    const onAddBookmarkHandler = (id) => {
        dispatch(AddBookmark({skillId: id}))
    }
    
  return (
    <div className='single-skill'>
        <BsFillBookmarkHeartFill id='book' onClick={() => onAddBookmarkHandler(skill?._id)}/>
        <div className="top-section">
            <div className="image">
                <img src={`${imageEndpoint}${user?.profile}`} alt="" loading='lazy'/>
            </div>
            <div className="container flex-column">
                <div className="row">
                    <Link className="name" to={`/u/@${user?.uName}`}>{user?.userName}</Link>
                    <PiDotOutlineDuotone id='dot'/>
                    <span id='dot'>since {moment(user?.userCreatedOn).format('LL')}</span>
                    <PiDotOutlineDuotone id='dot'/>
                    <span id='dot'>Listed on {moment(skill?.createdAt).format('LL')}</span>
                    <PiDotOutlineDuotone id='dot'/>
                    <div >
                        {user?.socialMedia?.instagram !== null && <Link to={user?.socialMedia?.instagram} target='_blank'><BsInstagram /></Link>}
                        {user?.socialMedia?.github !== null && <Link to={user?.socialMedia?.github} target='_blank'><BsGithub /></Link>}
                        {user?.socialMedia?.website !== null && <Link to={user?.socialMedia?.website} target='_blank'><BsGlobe /></Link>}
                    </div>
                </div>
                <div className="row-2">
                    <p className='heading'>{skill?.skillName}</p>
                </div>
            </div>
        </div>
        <div className="bottom">
            <div className="row-3">
                <p className="description">{skill?.skillDescription}</p>
            </div>
            <div className="row">
                <span className="link" onClick={onOpenHandler}>Open</span>
                <span className="link">Send Swap Request</span>
            </div>
        </div>
    </div>
  )
}

export default SingleSkill
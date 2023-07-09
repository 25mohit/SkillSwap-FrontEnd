import { BsDot, BsEye, BsEyeSlash, BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const SkillDetailRow = ({ heading, skills, fullControl, publicShow, type, bookFunction }) => {

    const navigate = useNavigate()

    const onEditHandler = () => {
        navigate(`/profile/skills/update--${skills?._id}--skill`)
    }

    useEffect(() => {
        localStorage.removeItem('singleSkill')
    },[])

    const onViewHandler = () =>{
        navigate(`/skill/detail/${skills?._id}`)
    }
    return (
<div className='skill-detail flex-between'>
        <div className='flex-column left' style={{width: publicShow ? '80%':''}}>
            <div className="flex-row" style={{border:'none'}}>
                <h4>{heading}<span>{skills?.priceTerm}</span></h4>
                <div className="level-container">
                    {
                        skills?.skillVisibility === "public" ? <BsEye /> : <BsEyeSlash />
                    }                    
                    <BsStarFill id='star-icn'/>
                    <BsStarFill id='star-icn'/>
                    <BsStarFill id='star-icn'/>
                    <BsStarHalf id='star-icn'/>
                    <BsStar id='star-icn'/>
                </div>
            </div>
            <div>
                <p>{skills?.skillDescription?.slice(0,fullControl ? 250 : 130)}{fullControl ? skills?.skillDescription?.length > 250 ? '...' : '.' : skills?.skillDescription?.length > 250 ? '...' :'.'}</p>
            </div>
            <footer className='footer'>
                {
                    skills?.skillTechnologies?.map((skill, ind) => <label className="skill-label" key={ind}>{skill}</label>)
                }
            </footer>
            <div className="footer-bt">
                {
                    fullControl && <div className="date-container">
                        <span className='info'>Created on {moment(skills?.createdAt).format('LL')}</span>
                        <BsDot style={{color:'purple'}}/>
                        <span className='info'>Updated on {moment(skills?.updatedAt).format('LL')}</span>
                        {skills?.receivedSkill !== undefined && skills?.receivedSkill > 0 && <><BsDot style={{color:'purple'}}/>
                        <span className="info">SkillSwap Requested {skills?.receivedSkill} time{skills?.receivedSkill > 1 ? 's' : ''}</span></>}
                        <BsDot style={{color:'purple'}}/>
                        <span className="info">12 Requests Pending</span>
                     
                    </div>
                }
            </div>
        </div>
       <div className='right'>
            <button className="btn-primary" onClick={onViewHandler}>View</button>
            {
                fullControl && <button className="btn-primary edit" onClick={onEditHandler}>Edit</button>
            }
            {
                type === "bookmark" && <button className='btn-primary danger' onClick={() => bookFunction(skills?.bookID)}>Remove</button>
            }
        </div>
    </div>
  )
}

export default SkillDetailRow
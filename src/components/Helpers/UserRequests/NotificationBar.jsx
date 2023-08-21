import moment from "moment";
import { useDispatch } from "react-redux";
import { ManageSentReq } from "../../../Redux/Actions/Actions";
import { useState } from "react";

const NotificationBar = ({ data }) => {

    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    
    const onClickHandler = (action, notification, skill) => {
        setIsLoading(true)
        const payload = {
            action,
            skill,
            notification
        }
        dispatch(ManageSentReq(payload))
    }

    return (
    <div className="notification-bar">
        <div className="img">
            <img src={`${process.env.REACT_APP_IMAGE_ENDPOINT}${data?.profile}`} alt="" />
        </div>
        <div className="content-container flex-column">
            <div>
                <span>{data?.message?.slice(0, data?.message?.length -1)} for your&nbsp;</span>
                <h3>{data?.skillDetails?.skillName}</h3> &nbsp;
                <span className="time-stamp-with-bg">{moment(data?.requestTime).startOf('minutes').fromNow()}</span>

            </div>
            <p>{data?.skillDetails?.skillDescription}</p>       
                     <span className="time-stamp-with-bg">skill listed {moment(data?.skillDetails?.createdAt).startOf('minutes').fromNow()}</span>

            <p  style={{whiteSpace:'nowrap', display:'flex', flexWrap:'wrap'}}> By&nbsp;<b style={{whiteSpace:'nowrap'}}>{data?.senderName} </b>&nbsp; ({data?.senderEmail}) for their&nbsp;<b  style={{whiteSpace:'nowrap'}}>{data?.senderSkillNameReqForSwaping}</b>&nbsp;Skill</p>
            {data?.status === 'pending' ? <footer className="foot">
                <button className="approve" onClick={!isLoading ? () => onClickHandler('approve', data?._id, data?.skillDetails?.id) : null}>Approve</button>
                <button className="reject" onClick={!isLoading ? () => onClickHandler('reject', data?._id, data?.skillDetails?.id) : null}>Reject</button>
            </footer> : <p className={data?.status === "accepted" ? "accepted" : 'rejected'} style={{background:'rgba(20,20,20,0.15)', width:'fit-content', lineHeight:'20px', padding:'0.1rem 0.4rem'}}>{data?.status}</p>}
        </div>
    </div>
  )
}

export default NotificationBar
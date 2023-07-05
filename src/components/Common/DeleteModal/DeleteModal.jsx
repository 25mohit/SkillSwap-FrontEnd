import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteSkill } from '../../../Redux/Actions/Actions'

const DeleteModal = ({ showDelete, onHide, skillId }) => {

    const dispatch = useDispatch()

    const response = useSelector(state => state.home.APIRESPONSE)

    useEffect(() => {
        if(response?.status){
            onHide(false)
        }
    },[response])

    const onCancelHandler = e => {
        e.preventDefault()
        onHide(false)
    }
    const deleteHandler = e => {
        e.preventDefault()
        dispatch(DeleteSkill(skillId))
    }
  return (
    <>
    <div className={`modal-main`} style={{pointerEvents:'none'}}>
        <div className={`delete-modal flex-column ${showDelete ? 'show' : 'hide'}`}>
            <p>Are you sure you want to delete this Skill ?</p>
            <div className="flex-row">
                <div className="div">
                    <button className="btn-primary danger" onClick={deleteHandler}>Yes</button>
                </div>
                <div className="div">
                    <button className="btn-primary" onClick={onCancelHandler}>No</button>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default DeleteModal
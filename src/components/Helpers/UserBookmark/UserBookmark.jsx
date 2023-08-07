import React, { useEffect, useState } from 'react'
import ProfileLayout from '../../Layouts/ProfileLayout/ProfileLayout'
import { GetBookmarks, RemoveBookmark } from '../../../Redux/Actions/Actions'
import { useDispatch, useSelector } from 'react-redux'
import CardLayout from '../../Layouts/CardLayout/CardLayout'
import SkillDetailRow from '../UserProfile/SkillDetailRow'
import ProfileSkillSkelton from '../../Layouts/Skelton/ProfileSkillSkelton'

const UserBookmark = () => {
  document.title = "SkillSwap | Bookmarks"
  const dispatch = useDispatch()
  const [emptyResponse, setEmptyResponse] = useState(false)

  useEffect(() => {
    dispatch(GetBookmarks())
  },[])

  const bookmarkList = useSelector(state => state.home.bookmarks)

  const removeBookmark = (id) => {
    dispatch(RemoveBookmark(id))
    setTimeout(() => {
      dispatch(GetBookmarks())
    },1000)
  }

  useEffect(() => {
    setTimeout(() => {
      if(bookmarkList?.length < 1){
        setEmptyResponse(true)
      }
    },2500)
  },[])

  return (
    <ProfileLayout>
        <div className="skill-control-header flex-between">
          <div className='flex'>
            <h2 className='heading-main'>Bookmarks</h2>
          </div>
        </div>
        <CardLayout>
          {
            bookmarkList?.length > 0 ? bookmarkList?.map((book, ind) =>  <SkillDetailRow bookFunction={removeBookmark} key={ind} heading={book?.skillName} skills={book} type="bookmark"/>) : 
              !emptyResponse ? <div className='flex-column' style={{gap:"1.1rem"}}>
                <ProfileSkillSkelton />
                <ProfileSkillSkelton />
                <ProfileSkillSkelton />
                <ProfileSkillSkelton />
                <ProfileSkillSkelton />
              </div> :
            <h2 className='main-heading-text'>You have not Bookmarked any skill YET !</h2>
          }
        </CardLayout>
    </ProfileLayout>
  )
}

export default UserBookmark
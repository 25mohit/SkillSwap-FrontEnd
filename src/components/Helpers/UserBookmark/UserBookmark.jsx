import React, { useEffect, useState } from 'react'
import ProfileLayout from '../../Layouts/ProfileLayout/ProfileLayout'
import { GetBookmarks, RemoveBookmark } from '../../../Redux/Actions/Actions'
import { useDispatch, useSelector } from 'react-redux'
import CardLayout from '../../Layouts/CardLayout/CardLayout'
import SkillDetailRow from '../UserProfile/SkillDetailRow'

const UserBookmark = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetBookmarks())
  },[])

  const bookmarkList = useSelector(state => state.home.bookmarks)

  console.log(bookmarkList);

  const removeBookmark = (id) => {
    dispatch(RemoveBookmark(id))
    setTimeout(() => {
      dispatch(GetBookmarks())
    },1000)
    console.log("myId", id);
  }
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
              <div>
                <h2>You have not Bookmarked any skill YET !</h2>
              </div>
          }
        </CardLayout>
    </ProfileLayout>
  )
}

export default UserBookmark
import { ADD_BOOKMARKS, CREATE_SKILL_REQ, DELETE_SINGLE_SKILL, GET_ALL_SKILLS, GET_ALL_SKILLS_PAGINATE, GET_BOOKMARKS, GET_NOTIFICATION, GET_PROFILE, GET_SINGLE_SKILL, GET_USER_PUBLIC_PROFILE, LOGIN_USER, MANAGE_SEND_SKILL_REQUEST, NOTIFICATION_BAR, REGISTER_USER, REMOVE_BOOKMARKS, SAVE_ALL_PAGINATE_SKILLS, SAVE_ALL_PAGINATE_SKILLSW, SAVE_API_RESPONSE, SAVE_BOOKMARKS, SAVE_NOTIFICATION, SAVE_PROFILE, SAVE_SINGLE_SKILL, SAVE_SKILL_LISTS, SAVE_USER_PUBLIC_PROFILE, SEND_SKILL_REQUEST, UPDATE_PROFILE, UPDATE_SKILL_REQ, UPLOAD_MEDIA } from '../types'

export const LoginUser = (userData) => {
    return{
        type: LOGIN_USER,
        payload: userData
    }
}

export const RegisterUser = (userData) => {
    return{
        type: REGISTER_USER,
        payload: userData
    }
}

export const GetProfile = () => {
    return{
        type: GET_PROFILE
    }
}

export const SaveProfile = (userData) => {
    return{
        type: SAVE_PROFILE,
        payload: userData
    }
}

export const UpdateUserProfile = (userData) => {
    return{
        type: UPDATE_PROFILE,
        payload: userData
    }
}

export const GetAllSkills = () => {
    return{
        type: GET_ALL_SKILLS
    }
}

export const SaveAllSkills = (skillsList) => {
    return{
        type: SAVE_SKILL_LISTS,
        payload: skillsList
    }
}

export const GetSingleSkill = (uuid) => {
    return{
        type: GET_SINGLE_SKILL,
        payload: uuid
    }
}

export const SaveSingleSkill = (skill) => {
    return{
        type: SAVE_SINGLE_SKILL,
        payload: skill
    }
}

export const AddNewSkill = (skillData) => {
    return{
        type: CREATE_SKILL_REQ,
        payload: skillData
    }
}

export const UpdateSkill = (skillData) => {
    return{
        type: UPDATE_SKILL_REQ,
        payload: skillData
    }
}

export const SendSkillRequest = (sendData) => {
    return {
        type: SEND_SKILL_REQUEST,
        payload: sendData
    }
}

export const ManageSentReq = (reqData) => {
    return {
        type: MANAGE_SEND_SKILL_REQUEST,
        payload: reqData
    }
}

export const SaveAPIResponse = (response) => {
    return{
        type: SAVE_API_RESPONSE,
        payload: response
    }
}

export const GetPublicProfile = (profileName) => {
    return{
        type: GET_USER_PUBLIC_PROFILE,
        payload: profileName
    }
}

export const SavePublicProfile = (profileRes) => {
    return{
        type: SAVE_USER_PUBLIC_PROFILE,
        payload: profileRes
    }
}

export const GetNotifications = () => {
    return{
        type: GET_NOTIFICATION
    }
}

export const SaveNotifications = (notificationList) => {
    return{
        type: SAVE_NOTIFICATION,
        payload: notificationList
    }
}

export const NotificationHandler = (notificationRes) => {
    return{
        type: NOTIFICATION_BAR,
        payload: notificationRes
    }
}

export const DeleteSkill = (skillId) => {
    return{
        type: DELETE_SINGLE_SKILL,
        payload: skillId
    }
}

export const GetAllSkillsPaginate = (filterData) => {
    return{
        type: GET_ALL_SKILLS_PAGINATE,
        payload: filterData
    }
}

export const SaveAllPaginateSkills = (responseData) => {
    return{
        type: SAVE_ALL_PAGINATE_SKILLS,
        payload: responseData
    }
}

export const UploadMedia = (media) => {
    return{
        type: UPLOAD_MEDIA,
        media
    }
}

export const GetBookmarks = () => {
    return {
        type : GET_BOOKMARKS
    }
}

export const SaveBookmarks = (data) => {
    return {
        type : SAVE_BOOKMARKS,
        payload: data
    }
}

export const AddBookmark = (data) => {
    return {
        type : ADD_BOOKMARKS,
        payload: data
    }
}

export const RemoveBookmark = (bookmarkID) => {
    return {
        type : REMOVE_BOOKMARKS,
        payload: bookmarkID
    }
}
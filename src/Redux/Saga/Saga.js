import axios from 'axios';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import * as Actions from '../types';
import { GetNotifications, NotificationHandler, SaveAPIResponse, SaveAllPaginateSkills, SaveAllSkills, SaveBookmarks, SaveNotifications, SaveProfile, SavePublicProfile, SaveSingleSkill } from '../Actions/Actions';

const PROJECT_MODE = "production"
// "https://skillswap.up.railway.app"
// "https://skillswap-api.onrender.com"
const API = PROJECT_MODE === "production" ? "https://skillswap.up.railway.app" : process.env.REACT_APP_ENDPOINT ;

const config = () => {
    let TOKEN = localStorage.getItem("token");

  while (!TOKEN) {
    // yield take("SET_TOKEN"); // Wait for the SET_TOKEN action to be dispatched
    TOKEN = localStorage.getItem("token");
  }

  let configObj = {}
  return configObj = {
    headers: {
      authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
  };
}

function* loginUserSaga(userData){
    const loginData = yield axios.post(`${API}/user/login`, userData.payload)
    .then((res) => {
        const response = res.data
        return response
    })
    .catch((err) => {
        const errMsg = err.response?.data;
        return errMsg
    })
    if(loginData){
        if(loginData?.status){
            yield put(NotificationHandler({status: true, message:loginData?.message}))
            localStorage.setItem('loggedIn', true)
            localStorage.setItem('user-name', JSON.parse(atob(loginData?.token?.split('.')[1]))?.name)
            localStorage.setItem('token', loginData?.token)
            localStorage.removeItem('temp-token')
        } else {
            yield put(NotificationHandler({status: true, message:"User not registered with us", type:'danger'}))
        }
    }
}

function* registerUserSaga(userData){
    const registerData = yield axios.post(`${API}/user/register`, userData.payload)
    .then((res) => {
        const response = res.data
        return response
    })
    .catch((err) => {
        const errMsg = err.response?.data;
        return errMsg
    })
    if(registerData){
        if(registerData?.status){
            localStorage.removeItem('temp-token')
            yield put(NotificationHandler({status: true, message:registerData?.message}))
        } else {
            yield put(NotificationHandler({status: true, message:registerData?.message, type:'danger'}))
        }
        // if(registerData?.status){
        //     localStorage.setItem('loggedIn', true)
        //     localStorage.setItem('token', registerData?.token)
        // }
    }
}

function* fetchSkillsList(){
    const skillsData = yield axios.get(`${API}/skill/my-skills`,  config())
    .then((res) => {
        const response = res.data
        return response
    })
    .catch((err) => {
        const errMsg = err.message;
        return errMsg
    })
    if(skillsData){
        if(skillsData?.status){
            yield put(SaveAllSkills(skillsData))
        }
    }
}

function* fetchSingleSkill(skillUUID){
    const singleSkill = yield axios.post(`${API}/skill/my-single-skill`, skillUUID.payload, config())
    .then((res) => {
        const response = res.data
        return response
    })
    .catch((err) => {
        const errMsg = err.message;
        return errMsg
    })
    if(singleSkill){
        if(singleSkill?.status){
            yield put(SaveSingleSkill(singleSkill))
        }
    }
}

function* createSkillReq(skillData){
    const createSkill = yield axios.post(`${API}/skill/create`, skillData.payload,  config())
    .then((res) => {
        const response = res.data
        return response
    })
    .catch((err) => {
        const errMsg = err?.response?.data;
        return errMsg
    })
    if(createSkill){
        yield put(NotificationHandler({status: true, message:createSkill?.message, type: 'danger'}))
        yield put(SaveAPIResponse(createSkill))
    }
}

function* updateSkillReq(skillData){
    const updateSkill = yield axios.patch(`${API}/skill/update/${skillData.payload.uuid}`, skillData.payload.data,  config())
    .then((res) => {
        const response = res.data
        return response
    })
    .catch((err) => {
        const errMsg = err.message;
        return errMsg
    })
    if(updateSkill){
        yield put(NotificationHandler({status: true, message:updateSkill?.message}))
        yield put(SaveAPIResponse(updateSkill))
    }
}

function* getUserPublicProfileFetch(publicProfile){
    const publicProfileRes = yield axios.post(`${API}/user/public-profile/${publicProfile.payload}`,{})
    .then((res) => {
        const response = res.data
        return response
    })
    .catch((err) => {
        const errMsg = err.message;
        return errMsg
    })
    if(publicProfileRes){
        yield put(SavePublicProfile(publicProfileRes))
    }
}

function* getPersonalProfile(){
    const profileRes = yield axios.get(`${API}/user/profile`,  config())
    .then((res) => {
        const response = res.data
        return response
    })
    .catch((err) => {
        const errMsg = err.message;
        return errMsg
    })
    if(profileRes){
        yield put(SaveProfile(profileRes))
    }
}

function* updateProfile(userData){
    const profileRes = yield axios.patch(`${API}/user/profile-update`, userData.payload,  config())
    .then((res) => {
        const response = res.data
        return response
    })
    .catch((err) => {
        const errMsg = err.message;
        return errMsg
    })
    if(profileRes){
        yield put(NotificationHandler({status: true, message:profileRes?.message}))
        yield put(SaveAPIResponse(profileRes))
    }
}

function* getNotification(){
    const notificationRes = yield axios.get(`${API}/user/notification`,  config())
    .then((res) => {
        const response = res.data
        return response
    })
    .catch((err) => {
        const errMsg = err.message;
        return errMsg
    })
    if(notificationRes){
        yield put(SaveNotifications(notificationRes))
    }
}

function* deleteSkill(skillID){
    const deleteSkill = yield axios.delete(`${API}/skill/delete/${skillID.payload}`,  config())
    .then((res) => {
        const response = res.data
        return response
    })
    .catch((err) => {
        const errMsg = err.message;
        return errMsg
    })
    if(deleteSkill){
        yield put(NotificationHandler({status: true, message:deleteSkill?.message}))
        yield put(SaveAPIResponse(deleteSkill))
    }
}

function* allSkillsPaginateReq(filterData){
    const allSkills = yield axios.post(`${API}/skill/get-all-skills`, filterData.payload ,  config())
    .then((res) => {
        const response = res.data
        return response
    })
    .catch((err) => {
        const errMsg = err.message;
        return errMsg
    })
    if(allSkills){
        yield put(SaveAllPaginateSkills(allSkills))
    }
}

function* uploadUserMedia(mediaData){
    const uploadMedia = yield axios.post(`${API}/upload/I`, mediaData.media.file ,  config())
    .then((res) => {
        const response = res.data
        return response
    })
    .catch((err) => {
        const errMsg = err.message;
        return errMsg
    })
    // if(uploadMedia){
    // }
}

function* getAllBookmarks(){
    const bookmarksRes = yield axios.get(`${API}/user/bookmark-get`,  config())
    .then((res) => {
        const response = res.data
        return response
    })
    .catch((err) => {
        const errMsg = err.message;
        return errMsg
    })
    if(bookmarksRes){
        yield put(SaveBookmarks(bookmarksRes?.result))
    }
}

function* removeBookmark(bookmarkID){
    const bookmarkDeleteRes = yield axios.delete(`${API}/user/bookmark-remove/${bookmarkID.payload}`,  config())
    .then((res) => {
        const response = res.data
        return response
    })
    .catch((err) => {
        const errMsg = err.message;
        return errMsg
    })
    if(bookmarkDeleteRes){           
        yield put(NotificationHandler({status: true, message:bookmarkDeleteRes?.message, type: "danger"}))
    }
}

function* addNewBookmark(data){
    const addBookmarkRes = yield axios.post(`${API}/user/bookmark`, data.payload,  config())
    .then((res) => {
        const response = res.data
        return response
    })
    .catch((err) => {
        const errMsg = err.response.data;
        NotificationHandler({status: true, message: errMsg?.message, type: 'danger'})
        return errMsg
    })
    if(addBookmarkRes){           
        yield put(NotificationHandler({status: true, message:addBookmarkRes?.message}))
    }
}

function* skillSwapRequestSend(data){
    const skillResData = yield axios.post(`${API}/user/swap-skill-request`, data.payload,  config())
    .then((res) => {
        const response = res.data
        return response
    })
    .catch((err) => {
        const errMsg = err.response.data;
        NotificationHandler({status: true, message: errMsg?.message, type: 'danger'})
        return errMsg
    })
    if(skillResData){    
        yield put(NotificationHandler({status: true, message:skillResData?.message}))
    }
}

function* ManageSkillSwapReq(data){
    const skillResData = yield axios.post(`${API}/user/handle-swap-skill-request`, data.payload,  config())
    .then((res) => {
        const response = res.data
        return response
    })
    .catch((err) => {
        const errMsg = err.response.data;
        NotificationHandler({status: true, message: errMsg?.message, type: 'danger'})
        return errMsg
    })
    if(skillResData){    
        yield put(GetNotifications())   
        if(skillResData?.status){
            yield put(NotificationHandler({status: true, message:skillResData?.message}))
        } else {
            yield put(NotificationHandler({status: true, message:skillResData?.message, type:'danger'}))
        }
    }
}

export function* HomeWatcher() {
    yield takeEvery(Actions.LOGIN_USER, loginUserSaga);
    yield takeEvery(Actions.REGISTER_USER, registerUserSaga);
    yield takeEvery(Actions.GET_ALL_SKILLS, fetchSkillsList);
    yield takeEvery(Actions.GET_SINGLE_SKILL, fetchSingleSkill);
    yield takeEvery(Actions.CREATE_SKILL_REQ, createSkillReq);
    yield takeEvery(Actions.UPDATE_SKILL_REQ, updateSkillReq);
    yield takeEvery(Actions.GET_USER_PUBLIC_PROFILE, getUserPublicProfileFetch);
    yield takeEvery(Actions.GET_PROFILE, getPersonalProfile);
    yield takeEvery(Actions.UPDATE_PROFILE, updateProfile);
    yield takeEvery(Actions.GET_NOTIFICATION, getNotification);
    yield takeEvery(Actions.DELETE_SINGLE_SKILL, deleteSkill);
    yield takeEvery(Actions.GET_ALL_SKILLS_PAGINATE, allSkillsPaginateReq);
    yield takeEvery(Actions.GET_BOOKMARKS, getAllBookmarks);
    yield takeEvery(Actions.ADD_BOOKMARKS, addNewBookmark);
    yield takeEvery(Actions.UPLOAD_MEDIA, uploadUserMedia);
    yield takeEvery(Actions.REMOVE_BOOKMARKS, removeBookmark);
    yield takeEvery(Actions.SEND_SKILL_REQUEST, skillSwapRequestSend);
    yield takeEvery(Actions.MANAGE_SEND_SKILL_REQUEST, ManageSkillSwapReq);
}

export default function* rootSaga() {
    yield all([fork(HomeWatcher)]);
}
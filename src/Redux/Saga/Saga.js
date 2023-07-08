import axios from 'axios';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import * as Actions from '../types';
import { NotificationHandler, SaveAPIResponse, SaveAllPaginateSkills, SaveAllSkills, SaveNotifications, SaveProfile, SavePublicProfile, SaveSingleSkill } from '../Actions/Actions';

const PROJECT_MODE = "production"

const API = PROJECT_MODE === "production" ? "https://skillswap-api.onrender.com" : process.env.REACT_APP_ENDPOINT ;

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
        const errMsg = err.message;
        return errMsg
    })
    if(loginData){
        if(loginData?.status){
            yield put(NotificationHandler({status: true, message:loginData?.message}))
            localStorage.setItem('loggedIn', true)
            localStorage.setItem('token', loginData?.token)
        }
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
        console.log("skillsData", skillsData);
        if(skillsData?.status){
            yield put(SaveAllSkills(skillsData?.skills))
        }
    }
}

function* fetchSingleSkill(skillUUID){
    console.log("skillUUID", skillUUID)
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
        console.log("singleSkill", singleSkill);
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
        console.log("errMsg", errMsg);
        return errMsg
    })
    if(createSkill){
        yield put(NotificationHandler({status: true, message:createSkill?.message, type: 'danger'}))
        yield put(SaveAPIResponse(createSkill))
        console.log("createSkill", createSkill);
    }
}

function* updateSkillReq(skillData){
    console.log("skillData", skillData);
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
        console.log("updateSkill", updateSkill);
        yield put(NotificationHandler({status: true, message:updateSkill?.message}))
        yield put(SaveAPIResponse(updateSkill))
    }
}

function* getUserPublicProfileFetch(publicProfile){
    // console.log("publicProfile", publicProfile);
    const publicProfileRes = yield axios.post(`${API}/user/public-profile/${publicProfile.payload}`,{},  config())
    .then((res) => {
        const response = res.data
        return response
    })
    .catch((err) => {
        const errMsg = err.message;
        return errMsg
    })
    if(publicProfileRes){
        console.log("publicProfileRes", publicProfileRes);
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
        console.log("profileRes", profileRes);
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
        console.log("profileRes", profileRes);
        yield put(NotificationHandler({status: true, message:profileRes?.message}))
        yield put(SaveAPIResponse(profileRes))
    }
}

function* getNotification(){
    console.log("configconfig", config());
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
        console.log("notificationRes", notificationRes);
        yield put(SaveNotifications(notificationRes))
    }
}

function* deleteSkill(skillID){
    console.log("configconfig", config());
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
        console.log("deleteSkill", deleteSkill);
        yield put(NotificationHandler({status: true, message:deleteSkill?.message}))
        yield put(SaveAPIResponse(deleteSkill))
    }
}

function* allSkillsPaginateReq(filterData){
    console.log("filterData", filterData);
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
        console.log("allSkills", allSkills);
        yield put(SaveAllPaginateSkills(allSkills))
    }
}

function* uploadUserMedia(mediaData){
    console.log("mediaData", mediaData.media.file);
    const uploadMedia = yield axios.post(`${API}/upload/I`, mediaData.media.file ,  config())
    .then((res) => {
        const response = res.data
        return response
    })
    .catch((err) => {
        const errMsg = err.message;
        return errMsg
    })
    if(uploadMedia){
        console.log("uploadMedia", uploadMedia);
        // yield put(SaveAPIResponse(uploadMedia))
    }
}

export function* HomeWatcher() {
    yield takeEvery(Actions.LOGIN_USER, loginUserSaga);
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
    yield takeEvery(Actions.UPLOAD_MEDIA, uploadUserMedia);
}

export default function* rootSaga() {
    yield all([fork(HomeWatcher)]);
}
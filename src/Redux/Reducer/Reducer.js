import { LOGIN_USER, NOTIFICATION_BAR, REGISTER_USER, SAVE_ALL_PAGINATE_SKILLS, SAVE_API_RESPONSE, SAVE_BOOKMARKS, SAVE_NOTIFICATION, SAVE_PROFILE, SAVE_SINGLE_SKILL, SAVE_SKILL_LISTS, SAVE_USER_PUBLIC_PROFILE } from "../types"

const initialState = {
    skillsList:[],
    profile:{},
    APIRESPONSE:{},
    publicProfileData:{},
    notifications:{},
    notification:{},
    allFilteredSkills:[],
    bookmarks:[],
}

const homeReducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN_USER:
            return{
                ...state,
                loginData:action.payload
            }
        case REGISTER_USER:
            return{
                ...state,
                registerData:action.payload
            }
        case SAVE_SKILL_LISTS:
            return{
                ...state,
                skillsList:action.payload
            }
        case SAVE_SINGLE_SKILL:
            return{
                ...state,
                singleSkill:action.payload
            }
        case SAVE_API_RESPONSE:
            return{
                ...state,
                APIRESPONSE:action.payload
            }
        case SAVE_USER_PUBLIC_PROFILE:
            return{
                ...state,
                publicProfileData:action.payload
            }
        case SAVE_PROFILE:
            return{
                ...state,
                profile:action.payload
            }
        case SAVE_NOTIFICATION:
            return{
                ...state,
                notifications:action.payload
            }
        case NOTIFICATION_BAR:
            return{
                ...state,
                notification:action.payload
            }
        case SAVE_ALL_PAGINATE_SKILLS:
            return{
                ...state,
                allFilteredSkills:action.payload
            }
            case SAVE_BOOKMARKS:
                return {
                    ...state,
                    bookmarks: action.payload
                }
        default:
            return state
    }
}

export default homeReducer
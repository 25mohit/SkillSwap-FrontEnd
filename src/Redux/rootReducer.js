import { combineReducers } from "redux";
import homeReducer from "./Reducer/Reducer";

const rootReducer = combineReducers({
    home: homeReducer
})

export default rootReducer
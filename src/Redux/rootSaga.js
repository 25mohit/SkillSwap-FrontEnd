import { all, fork } from "redux-saga/effects";
import HomeWatcher from "./Saga/Saga";

export default function* rootSaga() {
    yield all([fork(HomeWatcher)]);
}
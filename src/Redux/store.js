import {applyMiddleware, createStore } from 'redux'
import rootReducer from './rootReducer'
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(rootReducer, (applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(rootSaga);
import {combineReducers, createStore} from 'redux';
import {authReducer} from "./reducers";


const reducers = combineReducers({
    authReducer,
});

export const getStore = () => createStore(reducers);
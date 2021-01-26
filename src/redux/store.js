import {combineReducers, createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {authReducer as user} from "./reducers";


const reducers = combineReducers({
    user,
});

const devTool = composeWithDevTools(applyMiddleware());
export const getStore = () => createStore(reducers, devTool);
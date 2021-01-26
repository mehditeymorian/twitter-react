import {combineReducers, createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {authReducer as user} from "./reducers";
import thunk from "redux-thunk";


const reducers = combineReducers({
    user,
});

const devTool = composeWithDevTools(applyMiddleware(thunk));
export const getStore = () => createStore(reducers, devTool);
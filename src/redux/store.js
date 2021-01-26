import {combineReducers, createStore, applyMiddleware} from 'redux';
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage'
import {autoMergeLevel2} from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {composeWithDevTools} from 'redux-devtools-extension';
import {
    authReducer as user,
    createTweetReducer as createTweet

} from "./reducers";
import thunk from "redux-thunk";


const reducers = combineReducers({
    user,
    createTweet
});

const persistConfig = {
    key: 'twitter',
    blacklist: ['createTweet'],
    storage,
    stateReconciler : autoMergeLevel2
};

const persistedReducer = persistReducer(persistConfig, reducers);

const devTool = composeWithDevTools(applyMiddleware(thunk));
export const getStore = () => createStore(persistedReducer, devTool);
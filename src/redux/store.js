import {combineReducers, createStore, applyMiddleware} from 'redux';
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage'
import {autoMergeLevel2} from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {composeWithDevTools} from 'redux-devtools-extension';
import {authReducer as user, profileReducer as profile} from "./reducers";
import {createTweetReducer as createTweet} from "./reducers";
import {timelineReducer as timeline} from "./reducers";
import {deleteTweetReducer as deleteTweet} from "./reducers";
import {getTweetReducer as getTweet} from "./reducers";
import {getLikeRetTweetReducer as likeRetTweet} from "./reducers";
import {likeTweetReducer as likeTweet} from "./reducers";
import {unlikeTweetReducer as unlikeTweet} from "./reducers";
import {retweetReducer as retweet} from "./reducers";
import {deleteRetweetReducer as deleteRetweet} from "./reducers";
import {updateProfileReducer as updateProfile} from "./reducers";
import {updateUserReducer as updateUser} from "./reducers";
import thunk from "redux-thunk";


const reducers = combineReducers({
    user,
    createTweet,
    profile,
    timeline,
    deleteTweet,
    getTweet,
    likeRetTweet,
    likeTweet,
    unlikeTweet,
    retweet,
    deleteRetweet,
    updateProfile,
    updateUser,

});

const persistConfig = {
    key: 'twitter',
    blacklist: [
        'createTweet',
        'profile',
        'timeline',
        'deleteTweet',
        'getTweet',
        'likeRetTweet',
        'likeTweet',
        'unlikeTweet',
        'retweet',
        'deleteRetweet',
        'updateProfile',
        'updateUser',
    ],
    storage,
    stateReconciler : autoMergeLevel2
};

const persistedReducer = persistReducer(persistConfig, reducers);

const devTool = composeWithDevTools(applyMiddleware(thunk));
export const getStore = () => createStore(persistedReducer, devTool);
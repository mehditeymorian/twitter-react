import {
    LOGOUT,
    SIGNIN_FAIL,
    SIGNIN_INIT,
    SIGNIN_SUCCESS,
    SIGNUP_FAIL,
    SIGNUP_INIT,
    SIGNUP_SUCCESS,
    GET_PROFILE_INIT,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAIL,
    STATE_NULL,
    STATE_LOADING,
    STATE_SUCCESS,
    CREATE_TWEET_INIT,
    CREATE_TWEET_SUCCESS,
    CREATE_TWEET_FAIL,
    TIMELINE_INIT,
    DEL_TWEET_FAIL,
    DEL_TWEET_INIT,
    DEL_TWEET_SUCCESS,
    GET_TWEET_INIT,
    GET_TWEET_SUCCESS,
    GET_TWEET_FAIL,
    GET_LIKE_RET_TWEET_INIT,
    GET_LIKE_RET_TWEET_SUCCESS,
    GET_LIKE_RET_TWEET_FAIL,
    LIKE_TWEET_INIT,
    LIKE_TWEET_SUCCESS,
    LIKE_TWEET_FAIL,
    UNLIKE_TWEET_INIT,
    UNLIKE_TWEET_SUCCESS,
    UNLIKE_TWEET_FAIL,
    RETWEET_INIT,
    RETWEET_SUCCESS,
    RETWEET_FAIL,
    DEL_RETWEET_INIT,
    DEL_RETWEET_SUCCESS,
    DEL_RETWEET_FAIL,
    UPDATE_PROFILE_INIT, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL
} from "./actions";

const createDefault = () => ({
    state: STATE_NULL
});

const initUser = createDefault();
const initProfile = createDefault();
const initCreateTweet = createDefault();
const initTimeline = createDefault();
const initDeleteTweet = createDefault();
const initGetTweet = createDefault();
const initLikeRetTweet = createDefault();

const generalReducer = (initState, action, types) => {
    const {type, payload} = action;

    switch (type) {
        case types[0]:{ // init
            return {
                ...initState,
                state: STATE_LOADING
            };
        }
        case types[1]:{ // success
            const {result} = payload;
            return {
                ...result,
                state: STATE_SUCCESS
            };
        }
        case types[2]:{ // fail
            const {code} = payload;
            return {
                ...initState,
                state: code
            };
        }
        default:
            return initState;
    }
};

export const authReducer = (userState = initUser, action) => {
    const {type, payload} = action;

    switch (type) {
        case SIGNUP_INIT: {
            return {
                ...userState,
                state: STATE_LOADING
            };
        }
        case SIGNUP_FAIL: {
            const {code} = payload;
            return {
                ...userState,
                state: code
            };
        }
        case SIGNUP_SUCCESS: {
            const {user} = payload;
            return {
                ...user,
                state: STATE_SUCCESS
            };
        }
        case SIGNIN_INIT: {
            return {
                ...userState,
                state: STATE_LOADING
            };
        }
        case SIGNIN_SUCCESS: {
            const {result} = payload;
            return {
                ...result,
                state: STATE_SUCCESS
            };
        }
        case SIGNIN_FAIL: {
            const {code} = payload;
            return {
                ...userState,
                state: code
            };
        }
        case LOGOUT: {
            return {
                state: STATE_NULL
            };
        }
        default:
            return userState;
    }
};



export const createTweetReducer = (createTweet = initCreateTweet, action) => {
    const {type, payload} = action;

    switch (type) {
        case CREATE_TWEET_INIT:{
            return {
              ...createTweet,
              state: STATE_LOADING
            };
        }
        case CREATE_TWEET_SUCCESS:{
            const {result} = payload;
            return {
                ...result,
                state: STATE_SUCCESS
            };
        }
        case CREATE_TWEET_FAIL:{
            const {code} = payload;
            return {
                ...createTweet,
                state: code
            };
        }
        default:
            return createTweet;
    }
}

export const profileReducer = (profileState = initProfile, action) => {
    const {type, payload} = action;
    
    switch (type) {
        case GET_PROFILE_INIT: {
            return {
                ...profileState,
                state: STATE_LOADING
            };
        }
        case GET_PROFILE_SUCCESS: {
            const {profile} = payload;
            return {
                ...profile,
                state: STATE_SUCCESS
            };
        }
        case GET_PROFILE_FAIL: {
            const {code} = payload;
            return {
                ...profileState,
                state: code
            };
        }
        default:
            return profileState;
    }
}

export const timelineReducer = (timelineState = initTimeline, action) =>{
    const {type, payload} = action;

    switch (type) {
        case TIMELINE_INIT: {
            return {
                ...timelineState,
                state: STATE_LOADING
            };
        }
        case GET_PROFILE_SUCCESS: {
            const {result} = payload;
            return {
                ...result,
                state: STATE_SUCCESS
            };
        }
        case GET_PROFILE_FAIL: {
            const {code} = payload;
            return {
                ...timelineState,
                state: code
            };
        }
        default:
            return timelineState;
    }
}

export const deleteTweetReducer = (deleteTweetState = initDeleteTweet, action) => {
    const {type, payload} = action;

    switch (type) {
        case DEL_TWEET_INIT:{
            return {
                ...deleteTweetState,
                state: STATE_LOADING
            };
        }
        case DEL_TWEET_SUCCESS:{
            const {result} = payload;
            return {
                ...result,
                state: STATE_SUCCESS
            };
        }
        case DEL_TWEET_FAIL:{
            const {code} = payload;
            return {
                ...deleteTweetState,
                state: code
            };
        }
        default:
            return deleteTweetState;
    }
};

export const getTweetReducer = (getTweetState = initGetTweet, action) => {
    return generalReducer(getTweetState, action, [GET_TWEET_INIT, GET_TWEET_SUCCESS, GET_TWEET_FAIL]);
};

export const getLikeRetTweetReducer = (likeRetTweetState = initLikeRetTweet, action) => {
    return generalReducer(likeRetTweetState, action,
        [GET_LIKE_RET_TWEET_INIT, GET_LIKE_RET_TWEET_SUCCESS, GET_LIKE_RET_TWEET_FAIL]);
};

export const likeTweetReducer = (likeTweetState = createDefault(), action) => {
    return generalReducer(likeTweetState, action, [LIKE_TWEET_INIT, LIKE_TWEET_SUCCESS, LIKE_TWEET_FAIL]);
};

export const unlikeTweetReducer = (unlikeTweetState = createDefault(), action) => {
    return generalReducer(unlikeTweetState, action, [UNLIKE_TWEET_INIT, UNLIKE_TWEET_SUCCESS, UNLIKE_TWEET_FAIL]);
};

export const retweetReducer = (retweetState = createDefault(), action) => {
    return generalReducer(retweetState, action, [RETWEET_INIT, RETWEET_SUCCESS, RETWEET_FAIL]);
};

export const deleteRetweetReducer = (deleteRetweetState = createDefault(), action) => {
    return generalReducer(deleteRetweetState, action, [DEL_RETWEET_INIT, DEL_RETWEET_SUCCESS, DEL_RETWEET_FAIL]);
};

export const updateProfileReducer = (updateProfileState = createDefault(), action) => {
    return generalReducer(updateProfileState, action, [UPDATE_PROFILE_INIT, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL]);
};
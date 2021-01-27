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
    CREATE_TWEET_FAIL
} from "./actions";

const initUser = {
    state: STATE_NULL
};

const initProfile = {
	state: STATE_NULL
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


const createTweetInit = {
    state: STATE_NULL
};
export const createTweetReducer = (createTweet = createTweetInit, action) => {
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
import axios from "axios";
import {createFail, createInit, createSuccess} from "./stateUtils";

export const STATE_NULL = -1;
export const STATE_LOADING = 0;
export const STATE_SUCCESS = 1;

// ****************** SIGN UP ************************
export const SIGNUP_INIT = "SIGN_UP_INIT";
export const SIGNUP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGNUP_FAIL = "SIGN_UP_FAIL";

export const signup = (user) => async (dispatch, getState) => {
    dispatch(createInit(SIGNUP_INIT));
    await axios({
        baseURL: 'http://127.0.0.1:8585',
        method: 'post',
        url: '/signup',
        contentType: 'application/json',
        accept: '*/*',
        data: {
            user: {
                name: `${user.firstName} ${user.lastName}`,
                username: user.username,
                email: user.email,
                password: user.password
            }
        }
    })
        .then(value => {
            const result = {
                ...value.data.user
            };
            dispatch(createSuccess(SIGNUP_SUCCESS,result));
        })
        .catch(error => {
            printError(error);
            dispatch(createFail(SIGNUP_FAIL,error.response.status));
        });
};

// ****************** SIGN IN ************************
export const SIGNIN_INIT = "SIGNIN_INIT";
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_FAIL = "SIGNIN_FAIL";

export const signin = (user) => async (dispatch, getState) => {
    dispatch(createInit(SIGNIN_INIT));
    await axios({
        baseURL: 'http://127.0.0.1:8585',
        method: 'post',
        url: '/login',
        contentType: 'application/json',
        accept: '*/*',
        data: {
            user: {
            	username: user.username,
            	name: user.name,
                email: user.email,
                password: user.password
            }
        }
    })
        .then(value => {
            const result = {
                ...value.data.user
            }
            dispatch(createSuccess(SIGNIN_SUCCESS,result));
        })
        .catch(error => {
            printError(error);
            dispatch(createFail(SIGNIN_FAIL,error.response.status));
        });
};

// ****************** LOGOUT ************************
export const LOGOUT = "LOGOUT";
export const logoutUser = () => ({
	type: LOGOUT
});

// ****************** CREATE TWEET ************************
export const CREATE_TWEET_INIT = "CREATE_TWEET__INIT";
export const CREATE_TWEET_SUCCESS = "CREATE_TWEET_SUCCESS";
export const CREATE_TWEET_FAIL = "CREATE_TWEET_FAIL";
export const createTweet = (tweet) => async (dispatch, getState) => {
    dispatch(createInit(CREATE_TWEET_INIT));
    const {user} = getState();

    const bodyFormData = new FormData();
    bodyFormData.append("text", tweet.text);
    if (tweet.media != null) bodyFormData.append("media", tweet.media);
    if (tweet.parent != null) bodyFormData.append("parent", tweet.parent);

    await axios({
        baseURL: 'http://127.0.0.1:8585',
        method: 'post',
        url: '/tweets',
        data: bodyFormData,
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Token ${user.token}`
        }
    })
        .then(value => {
            const result = {
                ...value.data.tweet
            }
            dispatch(createSuccess(CREATE_TWEET_SUCCESS,result));
        })
        .catch(error => {
            printError(error);
            dispatch(createFail(CREATE_TWEET_FAIL,error.response.status));
        });
};

// ****************** GET TIMELINE ************************

export const TIMELINE_INIT = "TIMELINE_INIT";
export const TIMELINE_SUCCESS = "TIMELINESUCCESS";
export const TIMELINE_FAIL = "TIMELINEFAIL";
export const getTimeline = () => async (dispatch, getState) => {
    dispatch(createInit(TIMELINE_INIT));
    const {user} = getState();

    await axios({
        baseURL: 'http://127.0.0.1:8585',
        method: 'get',
        url: '/home',
        headers: {
            "Authorization": `Token ${user.token}`
        }
    })
        .then(value => {
            const result = {
                tweets: value.data.tweets,
                tweetsCount: value.data.tweetsCount
            }
            dispatch(createSuccess(TIMELINE_SUCCESS,result));
        })
        .catch(error => {
            printError(error);
            dispatch(createFail(TIMELINE_FAIL,error.response.status));
        });
}

export const GET_PROFILE_INIT = "GET_PROFILE_INIT";
export const getUserProfileInit = () => ({
	type: GET_PROFILE_INIT,
	payload: {
		code: STATE_LOADING,
	}
});

export const GET_PROFILE_SUCCESS = "GET_PROFILE_SUCCESS";
export const getUserProfileSuccess = result => ({
	type: GET_PROFILE_SUCCESS,
	payload: {
		code: STATE_SUCCESS,
		profile: result,
	}
});

export const GET_PROFILE_FAIL = "GET_PROFILE_FAIL";
export const getUserProfileFail = code => ({
	type: GET_PROFILE_FAIL,
	payload: {
		code: code,
	}
});

export const getProfile = (token, username) => async (dispatch, getState) => {
	dispatch(getUserProfileInit());
	await axios({
		baseURL: 'http://127.0.0.1:8585',
		method: 'get',
		url: '/profiles/' + username,
		contentType: 'application/json',
        headers: {"Authorization": "Token " + token},
	}).then(value => {
		const result = {
			profile: value.data.profile,
		}
		dispatch(getUserProfileSuccess(result));
	}).catch(error => {
		printError(error);
		dispatch(getUserProfileFail(error.status));
	});
};

function printError(error) {
	if (error.response) {
		// The request was made and the server responded with a status code
		// that falls out of the range of 2xx
		console.log(error.response.data);
		console.log(error.response.status);
		console.log(error.response.headers);
	} else if (error.request) {
		// The request was made but no response was received
		// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
		// http.ClientRequest in node.js
		console.log(error.request);
	} else {
		// Something happened in setting up the request that triggered an Error
		console.log('Error', error.message);
	}
	console.log(error.config);
}

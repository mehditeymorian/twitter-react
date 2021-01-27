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
export const CREATE_TWEET_INIT = "CREATE_TWEET_INIT";
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

// ****************** DELETE TWEET ************************
export const DEL_TWEET_INIT = "DEL_TWEET_INIT";
export const DEL_TWEET_SUCCESS = "DEL_TWEET_SUCCESS";
export const DEL_TWEET_FAIL = "DEL_TWEET_FAIL";
export const deleteTweet = (tweetId) => async (dispatch, getState) => {
    dispatch(createInit(DEL_TWEET_INIT));
    const {user} = getState();

    await axios({
        baseURL: 'http://127.0.0.1:8585',
        method: 'delete',
        url: `/tweets/${tweetId}`,
        headers: {
            "Authorization": `Token ${user.token}`
        }
    })
        .then(value => {
            const result = {
                ...value.data.tweet
            }
            dispatch(createSuccess(DEL_TWEET_SUCCESS,result));
        })
        .catch(error => {
            printError(error);
            dispatch(createFail(DEL_TWEET_FAIL,error.response.status));
        });
};

// ****************** GET TWEET ************************
export const GET_TWEET_INIT = "GET_TWEET_INIT";
export const GET_TWEET_SUCCESS = "GET_TWEET_SUCCESS";
export const GET_TWEET_FAIL = "GET_TWEET_FAIL";
export const getTweet = (tweetId) => async (dispatch, getState) => {
    dispatch(createInit(GET_TWEET_INIT));
    const {user} = getState();

    await axios({
        baseURL: 'http://127.0.0.1:8585',
        method: 'get',
        url: `/tweets/${tweetId}`,
        headers: {
            "Authorization": `Token ${user.token}`
        }
    })
        .then(value => {
            const result = {
                ...value.data.tweet
            }
            dispatch(createSuccess(GET_TWEET_SUCCESS,result));
        })
        .catch(error => {
            printError(error);
            dispatch(createFail(GET_TWEET_FAIL,error.response.status));
        });
};

// ****************** GET LIKE RETWEET of TWEET ************************
export const GET_LIKE_RET_TWEET_INIT = "GET_LIKE_RET_TWEET_INIT";
export const GET_LIKE_RET_TWEET_SUCCESS = "GET_LIKE_RET_TWEET_SUCCESS";
export const GET_LIKE_RET_TWEET_FAIL = "GET_LIKE_RET_TWEET_FAIL";
export const getLikeRetTweet = (tweetId) => async (dispatch, getState) => {
    dispatch(createInit(GET_LIKE_RET_TWEET_INIT));
    const {user} = getState();

    await axios({
        baseURL: 'http://127.0.0.1:8585',
        method: 'get',
        url: `/tweets/${tweetId}/list`,
        headers: {
            "Authorization": `Token ${user.token}`
        }
    })
        .then(value => {
            const result = {
                ...value.data
            }
            dispatch(createSuccess(GET_LIKE_RET_TWEET_SUCCESS,result));
        })
        .catch(error => {
            printError(error);
            dispatch(createFail(GET_LIKE_RET_TWEET_FAIL,error.response.status));
        });
};


// ****************** LIKE TWEET ************************
export const LIKE_TWEET_INIT = "LIKE_TWEET_INIT";
export const LIKE_TWEET_SUCCESS = "LIKE_TWEET_SUCCESS";
export const LIKE_TWEET_FAIL = "LIKE_TWEET_FAIL";
export const likeTweet = (tweetId) => async (dispatch, getState) => {
    dispatch(createInit(LIKE_TWEET_INIT));
    const {user} = getState();

    await axios({
        baseURL: 'http://127.0.0.1:8585',
        method: 'post',
        url: `/tweets/${tweetId}/like`,
        headers: {
            "Authorization": `Token ${user.token}`
        }
    })
        .then(value => {
            const result = {
                ...value.data.tweet
            }
            dispatch(createSuccess(LIKE_TWEET_SUCCESS,result));
        })
        .catch(error => {
            printError(error);
            dispatch(createFail(LIKE_TWEET_FAIL,error.response.status));
        });
};

// ****************** DELETE LIKE TWEET ************************
export const UNLIKE_TWEET_INIT = "UNLIKE_TWEET_INIT";
export const UNLIKE_TWEET_SUCCESS = "UNLIKE_TWEET_SUCCESS";
export const UNLIKE_TWEET_FAIL = "UNLIKE_TWEET_FAIL";
export const deleteLikeTweet = (tweetId) => async (dispatch, getState) => {
    dispatch(createInit(UNLIKE_TWEET_INIT));
    const {user} = getState();

    await axios({
        baseURL: 'http://127.0.0.1:8585',
        method: 'delete',
        url: `/tweets/${tweetId}/like`,
        headers: {
            "Authorization": `Token ${user.token}`
        }
    })
        .then(value => {
            const result = {
                ...value.data.tweet
            }
            dispatch(createSuccess(UNLIKE_TWEET_SUCCESS,result));
        })
        .catch(error => {
            printError(error);
            dispatch(createFail(UNLIKE_TWEET_FAIL,error.response.status));
        });
};

// ****************** RETWEET TWEET ************************
export const RETWEET_INIT = "RETWEET_INIT";
export const RETWEET_SUCCESS = "RETWEET_SUCCESS";
export const RETWEET_FAIL = "RETWEET_FAIL";
export const retweet = (tweetId) => async (dispatch, getState) => {
    dispatch(createInit(RETWEET_INIT));
    const {user} = getState();

    await axios({
        baseURL: 'http://127.0.0.1:8585',
        method: 'post',
        url: `/tweets/${tweetId}/retweet`,
        headers: {
            "Authorization": `Token ${user.token}`
        }
    })
        .then(value => {
            const result = {
                ...value.data.tweet
            }
            dispatch(createSuccess(RETWEET_SUCCESS,result));
        })
        .catch(error => {
            printError(error);
            dispatch(createFail(RETWEET_FAIL,error.response.status));
        });
};

// ****************** DELETE RETWEET TWEET ************************
export const DEL_RETWEET_INIT = "DEL_RETWEET_INIT";
export const DEL_RETWEET_SUCCESS = "DEL_RETWEET_SUCCESS";
export const DEL_RETWEET_FAIL = "DEL_RETWEET_FAIL";
export const deleteRetweet = (tweetId) => async (dispatch, getState) => {
    dispatch(createInit(DEL_RETWEET_INIT));
    const {user} = getState();

    await axios({
        baseURL: 'http://127.0.0.1:8585',
        method: 'delete',
        url: `/tweets/${tweetId}/retweet`,
        headers: {
            "Authorization": `Token ${user.token}`
        }
    })
        .then(value => {
            const result = {
                ...value.data.tweet
            }
            dispatch(createSuccess(DEL_RETWEET_SUCCESS,result));
        })
        .catch(error => {
            printError(error);
            dispatch(createFail(DEL_RETWEET_FAIL,error.response.status));
        });
};

// ****************** GET TIMELINE ************************

export const TIMELINE_INIT = "TIMELINE_INIT";
export const TIMELINE_SUCCESS = "TIMELINE_SUCCESS";
export const TIMELINE_FAIL = "TIMELINE_FAIL";
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
                ...value.data
            }
            dispatch(createSuccess(TIMELINE_SUCCESS,result));
        })
        .catch(error => {
            printError(error);
            dispatch(createFail(TIMELINE_FAIL,error.response.status));
        });
}

// ****************** GET PROFILE ************************

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


// ****************** UPDATE PROFILE ************************
export const UPDATE_PROFILE_INIT = "UPDATE_PROFILE_INIT";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_FAIL = "UPDATE_PROFILE_FAIL";
export const updateProfile = (profile) => async (dispatch, getState) => {
    dispatch(createInit(UPDATE_PROFILE_INIT));
    const {user} = getState();

    const bodyFormData = new FormData();
    if (profile.bio != null) bodyFormData.append("bio", profile.bio);
    if (profile.profile_picture != null) bodyFormData.append("profile_picture", profile.profile_picture);
    if (profile.header_picture != null) bodyFormData.append("header_picture", profile.header_picture);

    await axios({
        baseURL: 'http://127.0.0.1:8585',
        method: 'update',
        url: `/profiles/${user.username}`,
        data: bodyFormData,
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Token ${user.token}`
        }
    })
        .then(value => {
            const result = {
                ...value.data.profile
            }
            dispatch(createSuccess(UPDATE_PROFILE_SUCCESS,result));
        })
        .catch(error => {
            printError(error);
            dispatch(createFail(UPDATE_PROFILE_FAIL,error.response.status));
        });
};


// ****************** UPDATE USER ************************
export const UPDATE_USER_INIT = "UPDATE_USER_INIT";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAIL = "UPDATE_USER_FAIL";

export const updateUser = (updatedUser) => async (dispatch, getState) => {
    dispatch(createInit(UPDATE_USER_INIT));
    const {user} = getState();
    await axios({
        baseURL: 'http://127.0.0.1:8585',
        method: 'put',
        url: `/user/${user.username}`,
        data: {
            user: {
                username: updatedUser.username,
                email: updatedUser.email,
                password: updatedUser.password
            }
        },
        headers: {
            "Authorization": `Token ${user.token}`
        }
    })
        .then(value => {
            const result = {
                ...value.data.user
            };
            dispatch(createSuccess(UPDATE_USER_SUCCESS,result));
        })
        .catch(error => {
            printError(error);
            dispatch(createFail(UPDATE_USER_FAIL,error.response.status));
        });
};

// ****************** FOLLOW ************************
export const FOLLOW_INIT = "FOLLOW_INIT";
export const FOLLOW_SUCCESS = "FOLLOW_SUCCESS";
export const FOLLOW_FAIL = "FOLLOW_FAIL";

export const follow = (otherUser) => async (dispatch, getState) => {
    dispatch(createInit(FOLLOW_INIT));
    const {user} = getState();
    await axios({
        baseURL: 'http://127.0.0.1:8585',
        method: 'post',
        url: `/profiles/${otherUser.username}/follow`,
        headers: {
            "Authorization": `Token ${user.token}`
        }
    })
        .then(value => {
            const result = {
                ...value.data.profile
            };
            dispatch(createSuccess(FOLLOW_SUCCESS,result));
        })
        .catch(error => {
            printError(error);
            dispatch(createFail(FOLLOW_FAIL,error.response.status));
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

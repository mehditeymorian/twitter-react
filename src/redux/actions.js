import axios from "axios";
import {createFail, createInit, createSuccess} from "./stateUtils";

export const STATE_NULL = -1;
export const STATE_LOADING = 0;
export const STATE_SUCCESS = 1;
export const BASE_URL = "http://127.0.0.1:8585";

// ****************** SIGN UP ************************
export const SIGNUP_INIT = "SIGN_UP_INIT";
export const SIGNUP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGNUP_FAIL = "SIGN_UP_FAIL";

export const signup = (user) => async (dispatch, getState) => {
    dispatch(createInit(SIGNUP_INIT));
    await axios({
        baseURL: BASE_URL,
        method: 'post',
        url: '/signup',
        contentType: 'application/json',
        // accept: '*/*',
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
            console.log("value ", value);
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
        baseURL: BASE_URL,
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
export const createTweet = (tweet, fallback = "", props = {}) => async (dispatch, getState) => {
    dispatch(createInit(CREATE_TWEET_INIT));
    const {user} = getState();

    const bodyFormData = new FormData();
    bodyFormData.append("text", tweet.text);
    if (tweet.media != null) bodyFormData.append("media", tweet.media);
    if (tweet.parent != null) bodyFormData.append("parent", tweet.parent);

    await axios({
        baseURL: BASE_URL,
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
	        console.log("fallback and shit: ", fallback, props);
            if (fallback === "detail" && "id" in props) dispatch(getTweet(props.id));
            else if (fallback === "timeline") dispatch(getTimeline());
            else if (fallback === "profile" && "target" in props) dispatch(getProfile(user.token, props.target));
            else if (fallback === "explore" && "type" in props && "query" in props) dispatch(search(props.type, props.query));
            else if (tweet.parent != null) dispatch(getTweet(tweet.parent));
            else dispatch(getTimeline());
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
export const deleteTweet = (tweetId, loc) => async (dispatch, getState) => {
    dispatch(createInit(DEL_TWEET_INIT));
    const {user} = getState();

    await axios({
        baseURL: BASE_URL,
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
            loc === "timeline" ? dispatch(getTimeline()) : dispatch(getProfile(user.token, user.username));
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
        baseURL: BASE_URL,
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
            dispatch(getLikeRetTweet(tweetId));
        })
        .catch(error => {
            printError(error);
            dispatch(createFail(GET_TWEET_FAIL,getErrorCode(error)));
        });
};

export const TWEET_ACTION_INIT = "TWEET_ACTION_INIT";
export const TWEET_ACTION_SUCCESS = "TWEET_ACTION_SUCCESS";
export const TWEET_ACTION_FAIL = "TWEET_ACTION_FAIL";

// ****************** LIKE TWEET ************************
export const LIKE_TWEET_INIT = "LIKE_TWEET_INIT";
export const LIKE_TWEET_SUCCESS = "LIKE_TWEET_SUCCESS";
export const LIKE_TWEET_FAIL = "LIKE_TWEET_FAIL";
export const likeTweet = (tweetId) => async (dispatch, getState) => {
    dispatch(createInit(TWEET_ACTION_INIT));
    const {user} = getState();

    await axios({
        baseURL: BASE_URL,
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
            dispatch(createSuccess(TWEET_ACTION_SUCCESS,result));
        })
        .catch(error => {
            printError(error);
            dispatch(createFail(TWEET_ACTION_FAIL,error.response.status));
        });
};

// ****************** DELETE LIKE TWEET ************************
export const UNLIKE_TWEET_INIT = "UNLIKE_TWEET_INIT";
export const UNLIKE_TWEET_SUCCESS = "UNLIKE_TWEET_SUCCESS";
export const UNLIKE_TWEET_FAIL = "UNLIKE_TWEET_FAIL";
export const deleteLike = (tweetId) => async (dispatch, getState) => {
    dispatch(createInit(TWEET_ACTION_INIT));
    const {user} = getState();

    await axios({
        baseURL: BASE_URL,
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
            dispatch(createSuccess(TWEET_ACTION_SUCCESS,result));
        })
        .catch(error => {
            printError(error);
            dispatch(createFail(TWEET_ACTION_FAIL,error.response.status));
        });
};

// ****************** RETWEET TWEET ************************
export const RETWEET_INIT = "RETWEET_INIT";
export const RETWEET_SUCCESS = "RETWEET_SUCCESS";
export const RETWEET_FAIL = "RETWEET_FAIL";
export const retweet = (tweetId) => async (dispatch, getState) => {
    dispatch(createInit(TWEET_ACTION_INIT));
    const {user} = getState();

    await axios({
        baseURL: BASE_URL,
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
            dispatch(createSuccess(TWEET_ACTION_SUCCESS,result));
        })
        .catch(error => {
            printError(error);
            dispatch(createFail(TWEET_ACTION_FAIL,error.response.status));
        });
};

// ****************** DELETE RETWEET TWEET ************************
export const DEL_RETWEET_INIT = "DEL_RETWEET_INIT";
export const DEL_RETWEET_SUCCESS = "DEL_RETWEET_SUCCESS";
export const DEL_RETWEET_FAIL = "DEL_RETWEET_FAIL";
export const deleteRetweet = (tweetId) => async (dispatch, getState) => {
    dispatch(createInit(TWEET_ACTION_INIT));
    const {user} = getState();

    await axios({
        baseURL: BASE_URL,
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
            dispatch(createSuccess(TWEET_ACTION_SUCCESS,result));
        })
        .catch(error => {
            printError(error);
            dispatch(createFail(TWEET_ACTION_FAIL,error.response.status));
        });
};

// ****************** GET TIMELINE ************************

export const TIMELINE_INIT = "TIMELINE_INIT";
export const TIMELINE_SUCCESS = "TIMELINE_SUCCESS";
export const TIMELINE_FAIL = "TIMELINE_FAIL";
export const getTimeline = (dateCode=0) => async (dispatch, getState) => {
    dispatch(createInit(TIMELINE_INIT));
    const {user} = getState();

    await axios({
        baseURL: BASE_URL,
        method: 'get',
        url: `/home/${dateCode}`,
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

// ****************** GET Tweets ************************

export const GET_TWEETS_INIT = "GET_TWEETS_INIT";
export const GET_TWEETS_SUCCESS = "GET_TWEETS_SUCCESS";
export const GET_TWEETS_FAIL = "GET_TWEETS_FAIL";
export const getTweets = (tweetsIds) => async (dispatch, getState) => {
    dispatch(createInit(GET_TWEETS_INIT));
    const {user} = getState();

    await axios({
        baseURL: BASE_URL,
        method: 'post',
        url: `/tweets/get`,
        headers: {
            "Authorization": `Token ${user.token}`
        },
        data: {
            tweets: tweetsIds
        }
    })
        .then(value => {
            const result = {
                ...value.data
            }
            dispatch(createSuccess(GET_TWEETS_SUCCESS,result));
        })
        .catch(error => {
            printError(error);
            dispatch(createFail(GET_TWEETS_FAIL,error.response.status));
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
		baseURL: BASE_URL,
		method: 'get',
		url: '/profiles/' + username,
		contentType: 'application/json',
        headers: {"Authorization": "Token " + token},
	}).then(value => {
		const result = {
			profile: value.data.profile,
		}
		dispatch(getUserProfileSuccess(result));
        dispatch(getTweets(result.profile.tweets));
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
    if (profile.name != null) bodyFormData.append("name", profile.name);
    if (profile.bio != null) bodyFormData.append("bio", profile.bio);
    if (profile.profilePicture != null) bodyFormData.append("profile_picture", profile.profilePicture);
    if (profile.header != null) bodyFormData.append("header_picture", profile.header);

    await axios({
        baseURL: BASE_URL,
        method: 'put',
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
            dispatch(getProfile(user.token, user.username));
            dispatch(updateProfilePic(result.profile_picture));
        })
        .catch(error => {
            printError(error);
            dispatch(createFail(UPDATE_PROFILE_FAIL,error.response.status));
        });
};

export const updateProfilePic = (profilePic) => async (dispatch, getState) => {
    const {user} = getState();
    const result = {
        ...user,
        profile_picture : profilePic
    }
    dispatch(createSuccess(SIGNIN_SUCCESS, result));
};

// ****************** UPDATE USER ************************
export const UPDATE_USER_INIT = "UPDATE_USER_INIT";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAIL = "UPDATE_USER_FAIL";

export const updateUser = (updatedUser) => async (dispatch, getState) => {
    dispatch(createInit(UPDATE_USER_INIT));
    const {user} = getState();
    await axios({
        baseURL: BASE_URL,
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

export const follow = (username) => async (dispatch, getState) => {
    dispatch(createInit(FOLLOW_INIT));
    const {user} = getState();
    await axios({
        baseURL: BASE_URL,
        method: 'post',
        url: `/profiles/${username}/follow`,
        headers: {
            "Authorization": `Token ${user.token}`
        }
    })
        .then(value => {
            const result = {
                ...value.data.profile
            };
            dispatch(createSuccess(FOLLOW_SUCCESS,result));
            dispatch(getProfile(user.token, username));
        })
        .catch(error => {
            printError(error);
            dispatch(createFail(FOLLOW_FAIL,error.response.status));
        });
};

// ****************** UNFOLLOW ************************
export const UNFOLLOW_INIT = "UNFOLLOW_INIT";
export const UNFOLLOW_SUCCESS = "UNFOLLOW_SUCCESS";
export const UNFOLLOW_FAIL = "UNFOLLOW_FAIL";

export const unfollow = (username) => async (dispatch, getState) => {
    dispatch(createInit(UNFOLLOW_INIT));
    const {user} = getState();
    await axios({
        baseURL: BASE_URL,
        method: 'delete',
        url: `/profiles/${username}/follow`,
        headers: {
            "Authorization": `Token ${user.token}`
        }
    })
        .then(value => {
            const result = {
                ...value.data.profile
            };
            dispatch(createSuccess(UNFOLLOW_SUCCESS,result));
            dispatch(getProfile(user.token, username));
        })
        .catch(error => {
            printError(error);
            dispatch(createFail(UNFOLLOW_FAIL,error.response.status));
        });
};

// ****************** FOLLOWING FOLLOWER LIST ************************
export const FOLLOW_LIST_INIT = "FOLLOW_LIST_INIT";
export const FOLLOW_LIST_SUCCESS = "FOLLOW_LIST_SUCCESS";
export const FOLLOW_LIST_FAIL = "FOLLOW_LIST_FAIL";

export const followList = (username) => async (dispatch, getState) => {
    dispatch(createInit(FOLLOW_LIST_INIT));
    const {user} = getState();
    await axios({
        baseURL: BASE_URL,
        method: 'get',
        url: `/profiles/${username}/list`,
        headers: {
            "Authorization": `Token ${user.token}`
        }
    })
        .then(value => {
            const result = {
                ...value.data
            };
            dispatch(createSuccess(FOLLOW_LIST_SUCCESS,result));
        })
        .catch(error => {
            printError(error);
            dispatch(createFail(FOLLOW_LIST_FAIL,error.response.status));
        });
};

// ****************** LOGS LIST ************************
export const LOGS_INIT = "LOGS_INIT";
export const LOGS_SUCCESS = "LOGS_SUCCESS";
export const LOGS_FAIL = "LOGS_FAIL";

export const logs = (username) => async (dispatch, getState) => {
	dispatch(createInit(LOGS_INIT));
	const {user} = getState();
	await axios({
	    baseURL: BASE_URL,
	    method: 'get',
	    url: `/profiles/${username}/logs`,
	    headers: {
	        "Authorization": `Token ${user.token}`
	    }
	})
	    .then(value => {
	        const result = {
	            ...value.data
	        };
	        dispatch(createSuccess(LOGS_SUCCESS, result));
	    })
	    .catch(error => {
	        printError(error);
	        dispatch(createFail(LOGS_FAIL, error.response.status));
	    });
};

// ****************** SEARCH *************************************
export const SEARCH_INIT = "SEARCH_INIT";
export const SEARCH_SUCCESS = "SEARCH_SUCCESS";
export const SEARCH_FAIL = "SEARCH_FAIL";

export const search = (type, query) => async (dispatch, getState) => {
    dispatch(createInit(SEARCH_INIT));
	const {user} = getState();
    await axios({
        baseURL: BASE_URL,
        method: type === "tweet" ? "post" : "get",
        url: type === "hashtag" ? `/search/hashtag?query=${query}` :
            type === "user" ? `/search/username?query=${query}` : `/search/tweet`,
        data: type === "tweet" ? {"query": query} : null,
	    headers: {
		    "Authorization": "token" in user ? `Token ${user.token}` : "",
	    },
    })
        .then(value => {
            const result = {
                ...value.data
            };
            dispatch(createSuccess(SEARCH_SUCCESS, result));
        })
        .catch(error => {
            printError(error);
            dispatch(createFail(SEARCH_FAIL, error.response.status));
        });
};

// ******************** NOTIFICATION LIST **************************
export const NOTIFICATIONS_INIT = "NOTIFICATION_INIT";
export const NOTIFICATIONS_SUCCESS = "NOTIFICATION_SUCCESS";
export const NOTIFICATIONS_FAIL = "NOTIFICATION_FAIL";

export const notificationList = () => async (dispatch, getState) => {
	dispatch(createInit(NOTIFICATIONS_INIT));
	const {user} = getState();
	await axios({
		baseURL: BASE_URL,
		method: "get",
		url: `/profiles/${user.username}/notifications`,
		headers: {
			"Authorization": `Token ${user.token}`
		},
	})
		.then(value => {
			const result = {
				...value.data,
			};
			console.log(result);
			dispatch(createSuccess(NOTIFICATIONS_SUCCESS, result));
		})
		.catch(error => {
			printError(error);
			dispatch(createFail(NOTIFICATIONS_FAIL, error.response.status));
		});
};

// ********************* SUGGESTION LIST **************************
export const SUGGESTION_INIT = "SUGGESTION_INIT";
export const SUGGESTION_SUCCESS = "SUGGESTION_SUCCESS";
export const SUGGESTION_FAIL = "SUGGESTION_FAIL";

export const suggestionList = () => async (dispatch, getState) => {
    dispatch(createInit(SUGGESTION_INIT));
    const {user} = getState();
    await axios({
        baseURL: BASE_URL,
        method: "get",
        url: `/suggestions`,
        headers: {
            "Authorization": `Token ${user.token}`
        },
    })
        .then(value => {
            const result = {
                ...value.data,
            };
            console.log(result);
            dispatch(createSuccess(SUGGESTION_SUCCESS, result));
        })
        .catch(error => {
            printError(error);
            dispatch(createFail(SUGGESTION_FAIL, error.response.status));
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
        baseURL: BASE_URL,
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

function getErrorCode(error) {
    if (error.response) return error.response.status;
    else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        return 1000;
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        return 2000;
    }
}

import axios from "axios";

export const AUTH_NULL = -1;
export const AUTH_LOADING = 0;
export const AUTH_SUCCESS = 1;

export const SIGNUP_INIT = "SIGN_UP_INIT";
export const signup_init = () => ({
    type: SIGNUP_INIT,
    payload: {
        code: AUTH_LOADING
    }
});

export const SIGNUP_SUCCESS = "SIGN_UP_SUCCESS";
export const signup_success = result => ({
    type: SIGNUP_SUCCESS,
    payload: {
        code: AUTH_SUCCESS,
        user: result
    }
});

export const SIGNUP_FAIL = "SIGN_UP_FAIL";
export const signup_fail = code => ({
    type: SIGNUP_FAIL,
    payload: {
        code: code,
    }
});

export const signup = (user) => async (dispatch, getState) => {
    dispatch(signup_init());
    await axios({
        baseURL: 'http://127.0.0.1:8585',
        method: 'post',
        url: '/signup',
        contentType: 'application/json',
        data: {
            user: {
                username: user.username,
                email: user.email,
                password: user.password
            }
        }
    })
        .then(value => {
            const result = {
                ...user,
                token: value.data.user.token
            }
            dispatch(signup_success(result));
        })
        .catch(error => {
            printError(error);
            dispatch(signup_fail(error.response.status));
        });
};


export const SIGNIN_INIT = "SIGNIN_INIT";
export const signin_init = () => ({
    type: SIGNIN_INIT,
    payload: {
        code: AUTH_LOADING
    }
});

export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const signin_success = result => ({
    type: SIGNIN_SUCCESS,
    payload: {
        code: AUTH_SUCCESS,
        user: result
    }
});

export const SIGNIN_FAIL = "SIGNIN_FAIL";
export const signin_fail = code => ({
    type: SIGNIN_FAIL,
    payload: {
        code: code,
    }
});

export const signin = (user) => async (dispatch, getState) => {
    dispatch(signin_init());
    await axios({
        baseURL: 'http://127.0.0.1:8585',
        method: 'post',
        url: '/login',
        contentType: 'application/json',
        data: {
            user: {
                email: user.email,
                password: user.password
            }
        }
    })
        .then(value => {
            const result = {
                ...user,
                token: value.data.user.token
            }
            dispatch(signin_success(result));
        })
        .catch(error => {
            printError(error);
            // todo: fix the fail code
            dispatch(signin_fail(error.response.status));
        });
};


export const LOGOUT = "LOGOUT";
export const logoutUser = () => ({
    type: LOGOUT
});



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

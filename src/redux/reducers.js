import {
    AUTH_LOADING,
    AUTH_NULL, AUTH_SUCCESS,
    LOGOUT,
    SIGNIN_FAIL,
    SIGNIN_INIT,
    SIGNIN_SUCCESS,
    SIGNUP_FAIL,
    SIGNUP_INIT,
    SIGNUP_SUCCESS
} from "./actions";

const initUser = {
    state: AUTH_NULL
};

export const authReducer = (userState = initUser, action) => {
    const {type, payload} = action;

    switch (type) {
        case SIGNUP_INIT: {
            return {
                ...userState,
                state: AUTH_LOADING
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
                state: AUTH_SUCCESS
            };
        }
        case SIGNIN_INIT: {
            return {
                ...userState,
                state: AUTH_LOADING
            };
        }
        case SIGNIN_SUCCESS: {
            const {user} = payload;
            return {
                ...user,
                state: AUTH_SUCCESS
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
                state: AUTH_NULL
            };
        }
        default:
            return userState;
    }
};
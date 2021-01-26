import {
    LOGOUT,
    SIGNIN_FAIL,
    SIGNIN_INIT,
    SIGNIN_SUCCESS,
    SIGNUP_FAIL,
    SIGNUP_INIT,
    SIGNUP_SUCCESS
} from "./actions";

export const authReducer = (userState = null, action) => {
    const {type, payload} = action;

    switch (type) {
        case SIGNUP_INIT:{
            return userState;
        }
        case SIGNUP_FAIL:{
            return userState;
        }
        case SIGNUP_SUCCESS:{
            const {user} = payload;
            return user;
        }
        case SIGNIN_INIT:{
            return userState;
        }
        case SIGNIN_SUCCESS:{
            const {user} = payload;
            return user;
        }
        case SIGNIN_FAIL:{
            return userState;
        }
        case LOGOUT:{
            return null;
        }
        default: return userState;
    }
};
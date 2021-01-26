import {LOGIN, LOGOUT, SIGN_UP} from "./actions";

export const authReducer = (userState = null, action) => {
    const {type, payload} = action;

    switch (type) {
        case SIGN_UP:{
            const {user} = payload;
            return user;
        }
        case LOGIN:{
            const {user} = payload;
            return user;
        }
        case LOGOUT:{
            return null;
        }
        default: return userState;
    }
};
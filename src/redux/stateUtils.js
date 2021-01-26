import {AUTH_LOADING, AUTH_SUCCESS} from "./actions";


export const isUserPresent = user => user.state === AUTH_SUCCESS
export const isUserLoading = user => user.state === AUTH_LOADING;
export const isUserFailed = user => user.state >= 1;
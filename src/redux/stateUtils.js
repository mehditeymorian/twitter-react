import {BASE_URL, STATE_LOADING, STATE_SUCCESS} from "./actions";


export const isStatePresent = parent => parent.state === STATE_SUCCESS
export const isStateLoading = parent => parent.state === STATE_LOADING;
export const isStateFailed = parent => parent.state >= 1;


export const createInit = (type) => ({
    type: type,
    payload: {
        code: STATE_LOADING
    }
});

export const createSuccess = (type, result) => ({
    type: type,
    payload: {
        code: STATE_SUCCESS,
        result: result
    }
});

export const createFail = (type,failCode) => ({
    type: type,
    payload: {
        code: failCode
    }
});


export const getUserProfileImg = (link) => `${BASE_URL}/${link}`;
import {STATE_LOADING, STATE_SUCCESS} from "./actions";


export const isStatePresent = parent => parent.state === STATE_SUCCESS
export const isStateLoading = parent => parent.state === STATE_LOADING;
export const isStateFailed = parent => parent.state >= 1;
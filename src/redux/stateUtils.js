import {AUTH_SUCCESS} from "./actions";


export const isUserPresent = user =>{
    return user.state === AUTH_SUCCESS;
}
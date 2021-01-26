
export const SIGN_UP = "SIGN_UP";
export const signUpUser = user => ({
    type: SIGN_UP,
    payload: {user}
});



export const LOGIN = "LOGIN";
export const loginUser = user => ({
    type: LOGIN,
    payload: {user}
});

export const LOGOUT = "LOGOUT";
export const logoutUser = () => ({
    type: LOGOUT
});


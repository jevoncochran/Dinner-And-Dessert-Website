import axios from "axios";

export const ADMIN_LOGIN_START = 'ADMIN_LOGIN_START';
export const ADMIN_LOGIN_SUCCESS = 'ADMIN_LOGIN_SUCCESS';

// admin login
export const adminLogin = (credentials) => dispatch => {
    dispatch({ type: ADMIN_LOGIN_START });
    axios.post('http://localhost:5000/api/auth/login', credentials)
        .then(res => {
            console.log(res);
            dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: res.data.account })
        })
        .catch(err => {
            console.log(err);
        })
}

import axios from "axios";
import setAuthToken from "../components/utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING
} from "./_types";
/* 
 - An interaction (such as a button click or a form submission) in our React components will fire off an action and, 
 - in turn, dispatch an action to our store.
*/

/**
 * Registers new user
 * @param userData entered by user
 * @param history current user directory
 * @returns posts new user data to our Register route or errors
 */

// Register User
export const registerUser = (userData, history) => dispatch => {
    axios
        .post("/api/users/register", userData)
        .then(res => history.push("/login")) // re-direct to login on successful register
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

/**
 * Logins the user.
 * @param userData entered by user
 * @returns posts new user login request to our Login router or error
 */
// Login - get user token
export const loginUser = userData => dispatch => {
    axios
        .post("/api/users/login", userData)
        .then(res => {
            // Save to localStorage
            // Set token to localStorage
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};
// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

// User loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};

/**
 * Logs the current user off
 * @returns dispatch
 */
export const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};
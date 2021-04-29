import { GET_ERRORS } from "../actions/_types";
const initialState = {};

/*
- Reducers are pure functions that specify how application state should change in response to an action. 
- Reducers respond with the new state, which is passed to our store and, in turn, our UI.
*/

const errorReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_ERRORS:
            return action.payload;
        default:
            return state;
    }
}

export default errorReducer;
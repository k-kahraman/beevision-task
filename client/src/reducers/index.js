import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";

// We’ll use combinedReducers from redux to combine our authReducer and errorReducer into one rootReducer.

export default combineReducers({
  auth: authReducer,
  errors: errorReducer
});
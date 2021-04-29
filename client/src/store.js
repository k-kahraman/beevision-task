import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers"; // Comes from combined reducers in reducers/index.js

const initialState = {};

const middleware = [thunk];

/**
 * Our store also sends application state to our React components, 
 * which will react accordingly to that state.
 */
const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) ||
        compose
    )
);

export default store;
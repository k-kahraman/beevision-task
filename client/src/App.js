import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./components/utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./components/utils/Register";
import Login from "./components/utils/Login";
import ProtectedRoute from "./components/route/ProtectedRoute";
import Map from "./components/map/Map";

/**
 * Checking for token to keep user logged in even if they close the tab or refresh.
 * Every token has 1 years to expire.
 */
if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);
    
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));
    
    // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds

    // If token is expired:
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());

        // Redirect to login
        window.location.href = "./login";
    }
}

/**
 * Beevision Basic Control Center Application
 * @author Kaan Kahraman
 */
class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Navbar />
                        <Route exact path="/" component={Home} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                        <Switch>
                            <ProtectedRoute exact path="/map" component={Map} />
                        </Switch>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
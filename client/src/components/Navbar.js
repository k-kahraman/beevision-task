import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import Blink from 'react-blink-text';

import DEVICES from "./map/helpers/_devices"

/**
 * Navbar is navigation bar
 * It shows Company name and the logo
 * Also responsible for Logging out user and showing error notification
 */
class Navbar extends Component {

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        let isLoggedIn = false;
        let userName;
        if (this.props.auth.isAuthenticated) {
            isLoggedIn = this.props.auth.isAuthenticated;
            userName = this.props.auth.user.name.split(" ")[0];
        } else {
            isLoggedIn = false;
        }

        return (
            <div className="navbar-fixed">
                <nav className="z-depth-0">
                    <div className="nav-wrapper #fafafa grey lighten-4">
                        <Link
                            to="/"
                            className="col s5 brand-logo center orange-text"
                        >
                            <i className="material-icons">emoji_nature</i>
                            Honeycomb
                        </Link>
                        {// Showing log out
                        isLoggedIn &&
                            <div className="right">
                                <span className="orange-text left"
                                    style={{
                                        marginRight: "1em",
                                        fontSize: "24px"
                                    }}
                                ><strong>Welcome <em>{userName}</em></strong></span>
                                <button
                                    style={{
                                        width: "150px",
                                        borderRadius: "3px",
                                        marginRight: "1rem",
                                        marginTop: "1rem",
                                        fontWeight: "800"
                                    }}
                                    onClick={this.onLogoutClick}
                                    className="right btn btn-flat waves-effect waves-light hoverable orange white-text"
                                >
                                    Logout
                            </button>
                            </div>}
                        {// Showing error notification
                        isLoggedIn &&
                            <div className="left"
                                style={{
                                marginLeft: "3em",
                                fontWeight: "800"
                            }}
                            >
                                <Blink 
                                color='red' text={DEVICES[0].ERROR + " in " + DEVICES[0].NAME} 
                                fontSize='24'>
                                    Error Found
                                </Blink>
                            </div>
                        }
                    </div>
                </nav>
            </div >
        );
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Navbar);

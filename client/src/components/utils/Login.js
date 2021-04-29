import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }

    /**
     * If a logged in user tries to navigate to Login page we redirect them to map
     */
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/map");
        }
    }

    /** 
     * componentWillReceiveProps(nextProps) lifecycle method. 
    */
    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/map"); // Redirect user to map when they login
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
        this.props.loginUser(userData); 
    };

    render() {
        const { errors } = this.state;
        return (
            <div className="container">
                <div style={{ marginTop: "4rem" }} className="row">
                    <div className="col s8 offset-s2">
                        <Link to="/" className="btn-flat waves-effect">
                            <i className="material-icons left">home</i> Back to
                            Home
                        </Link>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h4>
                                <strong>Login Below</strong>
                            </h4>
                            <p className="grey-text text-darken-1">
                                Don't have an account? <Link to="/register">Register</Link>
                            </p>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="email"
                                    className={classnames("", {
                                        invalid: errors.email || errors.emailnotfound
                                    })}
                                />
                                <label htmlFor="email">
                                    <i className="material-icons left">email</i>
                                    Email
                                </label>
                                <span className="red-text">
                                    {errors.email}
                                    {errors.emailnotfound}
                                </span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password"
                                    className={classnames("", {
                                        invalid: errors.password || errors.passwordincorrect
                                    })}
                                />
                                <label htmlFor="password">
                                    <i className="material-icons left">password</i>
                                    Password
                                </label>
                                <span className="red-text">
                                    {errors.password}
                                    {errors.passwordincorrect}
                                </span>
                            </div>
                            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                <button
                                    style={{
                                        width: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"
                                    }}
                                    type="submit"
                                    className="btn btn-large waves-effect waves-light hoverable orange white-text"
                                    >
                                    <i className="material-icons right">login</i>
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Since we cannot define types in our constructor, it is considered good convention to do so using the prop-types package.
 */
Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

/**
 * mapStateToProps allows us to get our state from Redux and map it to props which we can use inside components.
 * @param state comes from redux
 * @returns map we will sent to our components
 */
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

/**
 * connect() does just that; it connects our React components to our Redux store provided by the Provider component
 */
export default connect(
    mapStateToProps,
    { loginUser }
)(Login);
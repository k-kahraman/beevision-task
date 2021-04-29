import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            passwordConfirm: "",
            errors: {}
        };
    }

    /**
     * If a logged in user tries to navigate to Register page we redirect them to map
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
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            passwordConfirm: this.state.passwordConfirm
        };
        this.props.registerUser(newUser, this.props.history);
    };
    
    render() {
        const { errors: errorMessages } = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col s8 offset-s2">
                        <Link to="/" className="btn-flat waves-effect">
                            <i className="material-icons left">home</i> Back to
                            home
                        </Link>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h4>
                                <strong>Register Below</strong>
                            </h4>
                            <p className="grey-text text-darken-1">
                                Already a member?<Link to="/login"> Log in</Link>
                            </p>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.name}
                                    error={errorMessages.name}
                                    id="name"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errorMessages.name
                                    })}
                                />
                                <label htmlFor="name">
                                    <i class="material-icons left">
                                    account_circle
                                    </i>
                                    Name
                                </label>
                                <span className="red-text">{errorMessages.name}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errorMessages.email}
                                    id="email"
                                    type="email"
                                    className={classnames("", {
                                        invalid: errorMessages.email
                                    })}
                                />
                                <label htmlFor="email">
                                    <i class="material-icons left">
                                    email
                                    </i>
                                    Email
                                </label>
                                <span className="red-text">{errorMessages.email}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errorMessages.password}
                                    id="password"
                                    type="password"
                                    className={classnames("", {
                                        invalid: errorMessages.password
                                    })}
                                />
                                <label htmlFor="password">
                                    <i class="material-icons left">
                                    password
                                    </i>
                                    Password
                                </label>
                                <span className="red-text">{errorMessages.password}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.passwordConfirm}
                                    error={errorMessages.passwordConfirm}
                                    id="passwordConfirm"
                                    type="password"
                                    className={classnames("", {
                                        invalid: errorMessages.passwordConfirm
                                    })}
                                />
                                <label htmlFor="passwordConfirm">
                                    <i class="material-icons left">
                                    password
                                    </i>
                                    Confirm Password
                                </label>
                                <span className="red-text">{errorMessages.passwordConfirm}</span>
                            </div>
                            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                <button
                                    style={{
                                        width: "180px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"
                                    }}
                                    type="submit"
                                    className="btn btn-large waves-effect waves-light hoverable orange white-text"
                                    >
                                    <i className="material-icons right">how_to_reg</i>
                                    Sign Up
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
Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
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
    { registerUser }
)(withRouter(Register));
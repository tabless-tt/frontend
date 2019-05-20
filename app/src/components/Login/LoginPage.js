import React from 'react';
import { connect } from 'react-redux';

//import actions

class LoginPage extends React.Component {
    state = {
        auth: {
            username: '',
            password: '',
        }
    };

    handleChanges = e => {
        this.setState({
            auth: {
                ...this.state.auth,
                [e.target.name]: e.target.value
            }
        });
    };

    login = e => {
        e.preventDefault();
        //login action --> push to tabs page
    }


    render() {
        return (
            <div className="login-container">
                <form className="login-form">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={this.handleChanges}
                        value={this.state.auth.username}
                    />

                    <input
                        type="text"
                        name="password"
                        placeholder="Password"
                        onChange={this.handleChanges}
                        value={this.state.auth.password}
                    />

                    <button> Login </button>
                </form>
            </div>
        )};
}


const mapStateToProps = state => ({
    isLoggingIn: state.isLoggingIn
});


export default connect(mapStateToProps)(LoginPage);
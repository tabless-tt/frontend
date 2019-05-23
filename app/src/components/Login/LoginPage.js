import React from 'react';
import { connect } from 'react-redux';
import { LogIn } from '../../actions';

import { Link } from 'react-router-dom';

import './login.scss';

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
        // check auth for proper info
        console.log(this.state.auth);
        this.props.LogIn(this.state.auth).then(() => {
            this.props.history.push('/');
            //window.location.reload();
        })
    }


    render() {
        return (
            <div className="topbar">
                <p>Tabless Thursday</p> 
            <div className="login-container">
                <div className="login-inner-container">
                <h3> Login </h3> 
                <form className="login-form" onSubmit={this.login}>
                    
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

                    <button> Submit </button>

                    <h4> Not a member? Sign up <Link to="/signup"> here </Link></h4>
                </form>
                </div>
            </div>
        </div>
        )};
}


const mapStateToProps = state => ({
    isLoggingIn: state.isLoggingIn
});


export default connect(mapStateToProps, { LogIn })(LoginPage);
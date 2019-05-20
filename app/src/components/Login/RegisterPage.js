import React from 'react';
import { connect } from 'react-redux';
import { Register } from '../../actions';

import './login.css';

class RegisterPage extends React.Component {
    state = {
        regauth: {
            username: '',
            password: '',
            email: ''
        }
    }

    handleChanges = e => {
        this.setState({
            regauth: {
                ...this.state.regauth,
                [e.target.name]: e.target.value
                }
            })
        }

    register = e => {
        e.preventDefault();
        //register action
        console.log('registering:')
        console.log(this.state.regauth);

        this.props.Register(this.state.regauth).then( () => {
            this.props.history.push('/login');
        })
    }


    render() {
        return (
            <div className="register-container">
                <h3> Register </h3>
                <form className="register-form" onSubmit={this.register}>

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={this.handleChanges}
                        value={this.state.regauth.username}
                    />
                     <input
                        type="text"
                        name="password"
                        placeholder="Password"
                        onChange={this.handleChanges}
                        value={this.state.regauth.password}
                    />
                     <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        onChange={this.handleChanges}
                        value={this.state.regauth.email}
                    />

                    <button> Register </button>
                </form>
            </div>
    )};
}

const mapStateToProps = state => ({
    isRegistering : state.isRegistering
});

export default connect(mapStateToProps, { Register })(RegisterPage);
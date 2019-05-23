import React from 'react';
import { connect } from 'react-redux';
import { Register } from '../../actions';
import { Link } from 'react-router-dom';

import './login.scss';

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
            this.props.history.push('/');
            //window.location.reload();
        })
    }


    render() {
        return (
            <div>
            <div className="topbar">
                <p>Tabless Thursday</p>
            </div>
            <div className="register-container">
                <div className="register-inner-container">
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
                        type="password"
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

                    <button> Submit </button>
                    <h4> Already a member? Log in <Link to="/login"> here </Link></h4>
                </form>
                </div>
            </div>
        </div>
    )};
}

const mapStateToProps = state => ({
    isRegistering : state.isRegistering
});

export default connect(mapStateToProps, { Register })(RegisterPage);
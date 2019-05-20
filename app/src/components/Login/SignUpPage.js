import React from 'react';


class SignUpPage extends React.Component {
    state = {
        auth: {
            username: '',
            password: '',
            email: ''
        }
    }

    render() {
        return (
            <div className="signup-container">
                <form className="signup-form">
                    
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
                     <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        onChange={this.handleChanges}
                        value={this.state.auth.email}
                    />

                    <button> Sign Up </button>
                </form>
            </div>
    )};
}

export default SignUpPage;
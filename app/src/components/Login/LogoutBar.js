import React from 'react';


class LogoutBar extends React.Component {
    state= {}

    logoutHandler = e => {
        e.preventDefault();
        localStorage.clear();
        window.location.reload();
    }

    render() {
        return (
            <div className="logoutbar"> 
                here I am 
            <button className="logout-btn" onClick={this.logoutHandler}> Logout </button>
            </div>
            
        )
    };
}

export default LogoutBar;
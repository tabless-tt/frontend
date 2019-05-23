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
                <p>Tabless Thursday</p> 
            <button className="logout-btn" onClick={this.logoutHandler}><i class="fas fa-sign-out-alt fa-2x" /></button>
            </div>
            
        )
    };
}

export default LogoutBar;
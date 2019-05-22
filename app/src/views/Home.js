import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

import LogoutBar from '../components/Login/LogoutBar';
import Tabs from '../components/Tabs/Tabs';
import LoginPage from '../components/Login/LoginPage';

class Home extends React.Component {
    state={
    }

    render() {
        if (localStorage.getItem('token'))
            return (
                <div>
                    <LogoutBar />
                    <Tabs />
                </div>
            )
       else 
        return ( 
            <div>
                <LoginPage />
            </div> 
        )
    }
}

export default Home;



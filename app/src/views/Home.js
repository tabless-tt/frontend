import React from 'react';

import { Redirect } from 'react-router-dom';
import LogoutBar from '../components/Login/LogoutBar';
// import LoginPage from '../components/Login/LoginPage';

import Tabs from '../components/Tabs/Tabs';


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
                );
       else 
        return ( 
                <Redirect to='/login' />
        );
    }
}

export default Home;



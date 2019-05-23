import React from 'react';

import { Redirect } from 'react-router-dom';
import LogoutBar from '../components/Login/LogoutBar';

import Tabs from '../components/Tabs/Tabs';


class Home extends React.Component {
    state={
    }

    //If there is a user logged in, render the header/tabs components, otherwise reroute to Login page
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



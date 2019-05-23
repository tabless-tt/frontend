import axios from 'axios';
import axiosAuth from '../axiosAuth'

// Server Routes
// `https://tabless-thursday-backend.herokuapp.com/api/users` get request, need token as header, recieve an array of users each with {id, username, password}
// `https://tabless-thursday-backend.herokuapp.com/api/register` requires username & password, email optional, post request 
// `https://tabless-thursday-backend.herokuapp.com/api/login` post request requires username & password, get an array with message.token

// `https://tabless-thursday-backend.herokuapp.com/api/tabs` get request will get you all tabs you can filter them out by user id when you get the user id from login
// `https://tabless-thursday-backend.herokuapp.com/api/tabs` post request requires {title , website, user_id}, optional {description, category, favicon }
// `https://tabless-thursday-backend.herokuapp.com/api/tabs/:id` delete request

// `https://tabless-thursday-backend.herokuapp.com/api/users/` get request will get you the decodedtoken of the current logged in user. when you get the token from register it doesnt have the subject as the id only if you login you'll get the token with username and subject as their id, haven't figured out how to fix that
// `https://tabless-thursday-backend.herokuapp.com/api/users/all` will get you all users and the token of the current logged in user
// `https://tabless-thursday-backend.herokuapp.com/api/users/:id` get request with user id will get you the users info plus an array of their posts


// Login Types

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

// Login func

export const LogIn = credentials => dispatch => {
    dispatch({type: LOGIN_START});
    return axios
        .post(
            `https://tabless-thursday-backend.herokuapp.com/api/login`, credentials
        )
        .then( res => {
            //setting these on local so we can grab them easily later
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userid', res.data.user.id);
            dispatch({type: LOGIN_SUCCESS, payload: res.data});
        })
        .catch(error => {
            console.log(error);
            dispatch({type: LOGIN_FAILURE})
        })
};

//Register Types

export const REGISTER_START = 'REGISTER_START';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

//register func

export const Register = newUser => dispatch => {
    dispatch({type: REGISTER_START});
    return axios 
        .post(
            `https://tabless-thursday-backend.herokuapp.com/api/register`, newUser
        )
        .then(res => {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userid', res.data.saved.id);
            dispatch({type: REGISTER_SUCCESS, payload: res.data});
        })
        .catch(error => {
            console.log(error);
            dispatch({type: REGISTER_FAILURE})
        })
};

//Tabs (use axiosAuth)

//Tab Types

export const TABFETCH_START = 'TABFETCH_START';
export const TABFETCH_SUCCESS = 'TABFETCH_SUCCESS';
export const TABFETCH_FAILURE = 'TABFETCH_FAILURE';

//tab fetch

export const fetchTabs = id => dispatch => {
    dispatch({type: TABFETCH_START});
    axiosAuth()
        .get(`https://tabless-thursday-backend.herokuapp.com/api/users/${id}`)
        .then(res => {
            console.log(res.data.tabs)
            dispatch({type: TABFETCH_SUCCESS, payload: res.data.tabs})
        })
        .catch(error => {
            console.log(error);
            dispatch({type: TABFETCH_FAILURE})
        })
}

//New Tab types

export const NEWTAB_START = 'NEWTAB_START';
export const NEWTAB_SUCCESS = 'NEWTAB_SUCCESS';
export const NEWTAB_FAILURE = 'NEWTAB_FAILURE';


export const newTab = tab => dispatch => {
    tab = {
        ...tab, 
        user_id: localStorage.getItem('userid')
    }
    dispatch({type: NEWTAB_START});
    axiosAuth()
        .post(`https://tabless-thursday-backend.herokuapp.com/api/tabs`, tab)
        .then(res => {
            console.log('New tab: ');
            console.log(res);
            dispatch({type: NEWTAB_SUCCESS, payload: res.data[0]})
        })
        .catch(error => {
            console.log(error);
            dispatch({type: NEWTAB_FAILURE});
        })
}

// Delete Tab Types

export const DELETETAB_START = 'DELETETAB_START';
export const DELETETAB_SUCCESS = 'DELETETAB_SUCCESS';
export const DELETETAB_FAILURE = 'DELETETAB_FAILURE';


//delete Tab action

export const deleteTab = id => dispatch => {
    dispatch({type: DELETETAB_START});
    axiosAuth()
        .delete(`https://tabless-thursday-backend.herokuapp.com/api/tabs/${id}`)
        .then(res => {
            dispatch({type: DELETETAB_SUCCESS});
        })
        .catch(error => {
            console.log(error);
            dispatch({type: DELETETAB_FAILURE});
        })
}

//update Tab Types

export const UPDATETAB_START = 'UPDATETAB_START';
export const UPDATETAB_SUCCESS = 'UPDATETAB_SUCCESS';
export const UPDATETAB_FAILURE = 'UPDATETAB_FAILURE';

// update tab action

export const updateTab = (updatedTab, tabid) => dispatch => {
    dispatch({type: UPDATETAB_START})
    axiosAuth()
        .put(`https://tabless-thursday-backend.herokuapp.com/api/tabs/${tabid}`, updatedTab)
        .then(res => {
            dispatch({type: UPDATETAB_SUCCESS});
        })
        .catch(error => {
            console.log(error);
            dispatch({type: UPDATETAB_FAILURE});
        })

}
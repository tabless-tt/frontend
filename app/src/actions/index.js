import axios from 'axios';
import axiosAuth from '../axiosAuth'

// Server Routes
// `https://tabless-thursday-backend.herokuapp.com/api/users` get request, need token as header, recieve an array of users each with {id, username, password}
// `https://tabless-thursday-backend.herokuapp.com/api/register` requires username & password, email optional, post request 
// `https://tabless-thursday-backend.herokuapp.com/api/login` post request requires username & password, get an array with message.token


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
            //checking results
            console.log('User data: ');
            console.log(res.data.message);
            localStorage.setItem('token', res.data.token);
            dispatch({type: LOGIN_SUCCESS, payload: res.data.token});
        })
        .catch(error => console.log(error))
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
            //checking results
            console.log('Register data: ');
            console.log(res.data);
            dispatch({type: REGISTER_SUCCESS});
        })
        .catch(error => console.log(error))
};

//Tabs (use axiosAuth)

//Tab Types

export const TABFETCH_START = 'TABFETCH_START';
export const TABFETCH_SUCCESS = 'TABFETCH_SUCCESS';
export const TABFETCH_FAILURE = 'TABFETCH_FAILURE';

//tab fetch

export const fetchTabs = () => dispatch => {
    dispatch({type: TABFETCH_START});

    return console.log('fetch');
}
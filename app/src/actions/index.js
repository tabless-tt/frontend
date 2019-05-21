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
            //checking results
            //console.log(res.data.message);
            //console.log(res.data)
            localStorage.setItem('token', res.data.token);
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
            //checking results
            //console.log('Register data: ');
            //console.log(res.data);
            localStorage.setItem('token', res.data.token);
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
        .get(`https://tabless-thursday-backend.herokuapp.com/api/tabs`)
        .then(res => {
            console.log('tab data: ')
            console.log(id);
            console.log(res.data)

            let tabs = res.data.filter(tab => tab.user_id === id)
            dispatch({type: TABFETCH_SUCCESS, payload: tabs})
        })
        .catch(error => {
            console.log(error);
            dispatch({type: TABFETCH_FAILURE})
        })
}

//get User types

// export const USERFETCH_START = 'USERFETCH_START'
// export const USERFETCH_SUCCESS = 'USERFETCH_SUCCESS'
// export const USERFETCH_FAILURE = 'USERFETCH_FAILURE'

// //get current user

// export const getUser = () => dispatch => {
//     dispatch({type: USERFETCH_START});
//     axiosAuth()
//         .get(`https://tabless-thursday-backend.herokuapp.com/api/users/`)
//         .then(res => {
//             console.log('user data: ');
//             console.log(res.data);
//             dispatch({type: USERFETCH_SUCCESS, payload: res.data})
//         })
//         .catch(error => {
//             console.log(error);
//             dispatch({type: USERFETCH_FAILURE})
//         })
// }
// import action creators
import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_START,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    TABFETCH_START,
    TABFETCH_SUCCESS,
    TABFETCH_FAILURE,
    DELETETAB_START,
    DELETETAB_SUCCESS,
    DELETETAB_FAILURE
} from '../actions';

//initial

const initialState = {
    token: {},
    user: {},
    tabs: [],
    isLoggingIn: false,
    isRegistering: false,
    fetchingTabs: false,
    fetchingUser: false,
    deletingTab: false,
    error: ''
}

//reducer

function reducer(state = initialState, action) {
    switch(action.type) {
        case LOGIN_START:
            return {
                ...state,
                isLoggingIn: true,
                error: ''
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggingIn: false,
                user: action.payload.user,
                error: ''
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                isLoggingIn: false,
                error: 'Login Failed'
            }
        case REGISTER_START: 
            return {
                ...state,
                isRegistering: true,
                error: ''
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                isRegistering: false,
                user: action.payload.saved,
                error: ''
            }
        case REGISTER_FAILURE:
            return {
                ...state,
                isRegistering: false,
                error: 'Register failed'
            }
        case TABFETCH_START:
            return {
                ...state,
                fetchingTabs: true,
                error: ''
            }
        case TABFETCH_SUCCESS:
            return {
                ...state,
                tabs: action.payload,
                fetchingTabs: false,
                error: ''
            }
        case TABFETCH_FAILURE:
            return {
                ...state,
                fetchingTabs: false,
                error: 'Fetching Tabs failed'
            }
        case DELETETAB_START:
            return {
                ...state,
                deletingTab: true,
                error: ''
            }
        case DELETETAB_SUCCESS: 
            return {
                ...state,
                deletingTab: false,
                error: ''
            }
        case DELETETAB_FAILURE:
            return {
                ...state,
                deletingTab: false,
                error: 'Deleting tab failed'
            }
        
        default: 
            return state;
    }
}

export default reducer;
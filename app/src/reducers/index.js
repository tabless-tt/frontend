// import action creators


//initial

const initialState = {
    register : [],
    token: {},
    user: {},
    tabs: [],
    isLoggingIn: false,
    isSigningUp: false
}

//reducer

function reducer(state = initialState, action) {
    console.log('Reducer', action);
    switch(action.type) {
        default: 
            return state;
    }
}

export default reducer;
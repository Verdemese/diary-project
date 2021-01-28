import * as actionTypes from '../UI/UIactionTypes'; 

const initialState = {
    authenticated: false,
    userProfile: {},
}

export default (state = initialState, action) => {

    switch (action.type) {
        case (actionTypes.AUTHENTICATED): {
            return {
                ...state,
                authenticated: true
            }
        }
        case (actionTypes.PROFILE): {
            return {
                ...state,
                userProfile: action.profile
            }
        }
    }

    return state;
}
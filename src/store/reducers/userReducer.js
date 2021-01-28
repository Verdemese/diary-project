import * as actionTypes from '../user/userActionTypes';

const initialState = {
    userData: {},
    userToken: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.USER_DATA): {
            return {
                ...state,
                userData: action.userData
            }
        }
        case (actionTypes.USERTOKEN): {
            return {
                ...state,
                userToken: action.userToken
            }
        }
    }
    
    return state;
}
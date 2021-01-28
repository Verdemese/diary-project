import * as actionTypes from './userActionTypes';

export const storeUserData = (userData) => {
    return {
        type: actionTypes.USER_DATA,
        userData
    }
}

export const storeUserToken = (userToken) => {
    return {
        type: actionTypes.USERTOKEN,
        userToken
    }
}
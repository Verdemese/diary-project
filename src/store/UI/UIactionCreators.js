import * as actionTypes from './UIactionTypes';

export const isAuthenticated = () => {
    return {
        type: actionTypes.AUTHENTICATED
    }
}

export const userProfile = (profile) => {
    return {
        type: actionTypes.PROFILE,
        profile
    }
}

export const checkAuthentication = () => {
    return {
        type: actionTypes.AUTHENTICATED
    }
}
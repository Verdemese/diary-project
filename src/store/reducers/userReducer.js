import * as actionTypes from '../user/userActionTypes';

const initialState = {
    userData: {},
    datesDetail: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.USER_DATA): {
            return {
                ...state,
                userData: action.userData
            }
        }
        case (actionTypes.DATES_DETAIL): {
            return {
                ...state,
                datesDetail: action.datesDetail
            }
        }
    }
    
    return state;
}
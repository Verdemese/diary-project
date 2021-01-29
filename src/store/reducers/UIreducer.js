import * as actionTypes from '../UI/UIactionTypes'; 

const initialState = {
    authenticated: false,
}

export default (state = initialState, action) => {

    switch (action.type) {
        case (actionTypes.AUTHENTICATED): {
            return {
                ...state,
                authenticated: true
            }
        }
    }

    return state;
}
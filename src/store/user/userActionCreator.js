import * as actionTypes from './userActionTypes';
import axios from '../../aixos-wordsDate'

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

export const loadedDatesDetail = datesDetail => {
    return {
        type: actionTypes.DATES_DETAIL,
        datesDetail
    }
}

export const storeDatesDetail = (uid, year, month) => {
    return dispatch => {
        const today = new Date();
        year = today.getFullYear();
        month = today.getMonth();

        axios.get(`/${uid}/${year}/${month}.json`)
            .then(response => {

                console.log(response);

                for (let key in response.data) {
                    
                        let updatedDetail = [];

                        updatedDetail = [...response.data[key].datesDetail];
                        updatedDetail.forEach(date => {
                            if (!date.words) {
                                date.words = [];
                            }
                        });

                        dispatch(loadedDatesDetail(updatedDetail));

                    }
                });
    }
}
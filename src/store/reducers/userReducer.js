import axios from '../../aixos-wordsDate';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    today: {},
    // { year, month }
    dateForChange: {},
    // { year, month }
    userData: {},
    // { uid }
    datesDetail: [],
    // [{date, id, words}, ...]
    selectedDate: {},
    // {date, id, words=[]}
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    reducers: {
        storeUserData: (state, action) => {
            return {
                ...state,
                userData: {
                    ...state.userData,
                    uid: action.payload
                }
            }
        },

        storeDatesDetail: (state, action) => {
            return {
                ...state,
                datesDetail: action.payload
            }
        },

        storeToday: (state, action) => {
            return {
                ...state,
                today: {
                    ...action.payload
                },
                dateForChange: {
                    ...action.payload
                }
            }
        },

        nextMonth: state => {
            let year = state.dateForChange.year;
            let month = state.dateForChange.month + 1; //현재의 month에서 1을 더함

            //현재 state.month가 11인 상태에서 1을 더하여 11을 초과한 경우
            //다음 해로 이동함과 동시에 월을 1월 1일로 초기화
            if (month > 11) {
                year = year + 1;
                month = 0;
            }

            return {
                ...state,
                dateForChange: {
                    ...state.dateForChange,
                    year,
                    month
                }
            }
        },

        prevMonth: state => {
            let year = state.dateForChange.year;
            let month = state.dateForChange.month - 1;

            //현재 state.month가 0인 상태에서 1을 빼서 0미만이 된 경우
            //이전 해로 이동함과 동시에 월을 12월 1일로 초기화        
            if (month < 0) {
                year = year - 1;
                month = 11;
            }

            return {
                ...state,
                dateForChange: {
                    ...state.dateForChange,
                    year,
                    month
                }
            }
        },

        selectDate: (state, action) => {

            return {
                ...state,
                selectedDate: {
                    ...state.selectedDate,
                    ...action.payload,
                    words: [...action.payload.words]
                }
            }
        },

        updateUserData: (state, action) => {
            return {
                ...state,
                userData: {
                    ...state.userData,
                    profilePicture: action.payload
                }
            }
        },
        resetUserState: () => {
            return initialState;
        }
    }
})

export const {
    storeUserData,
    storeDatesDetail,
    storeToday,
    nextMonth,
    prevMonth,
    selectDate,
    updateUserData,
    resetUserState
} = userSlice.actions;

export default userSlice.reducer;

export const loadToday = () => {
    return dispatch => {
        const today = new Date();
        const year = today.getFullYear() * 1;
        const month = today.getMonth() * 1;
        const date = today.getDate() * 1;

        dispatch(storeToday({ year, month, date }));
    }
}

export const saveDatesDetail = (obj) => {
    return async dispatch => {

        await axios.get(`/${obj.uid}/${obj.year}/${obj.month}.json`)
            .then(response => {

                if (response.data) {
                    const lastUpdate = response.data.datesDetail;
                    lastUpdate.map(date => {
                        if (!date.words) {
                            date.words = [];
                        }
                        return date;
                    })
                    dispatch(storeDatesDetail(lastUpdate));
                }
            }
            );
    }
}

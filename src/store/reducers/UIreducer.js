import { createSlice } from '@reduxjs/toolkit';

export const UIslice = createSlice({
    name: 'UI',
    initialState: {
        authenticated: false,
        DAY_OF_THE_WEEK: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
    },
    reducers: {
        checkAuthentication: state => {
            return {
                ...state,
                authenticated: !state.authenticated
            }
        }
    }
});

export const { checkAuthentication } = UIslice.actions;

export default UIslice.reducer;


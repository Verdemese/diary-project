import { createSlice } from '@reduxjs/toolkit';
import firebase from '../../firebase';

const initialState = {
    authenticated: false,
    DAY_OF_THE_WEEK: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
    userProfile: {}
}

export const UIslice = createSlice({
    name: 'UI',
    initialState,
    reducers: {
        convertAuthentication: (state, action) => {
            return {
                ...state,
                authenticated: !state.authenticated
            }
        },
        userProfile: (state, action) => {
            return {
                ...state,
                userProfile: {
                    ...state.userProfile,
                    ...action.payload
                }
            }
        },
        resetUIState: () => {
            return initialState;
        }
    }
});

export const { 
    convertAuthentication,
    userProfile,
    resetUIState
 } = UIslice.actions;

export default UIslice.reducer;

export const updateUserProfile = (uid) => {
    return async dispatch => {
        const user = firebase.auth().currentUser;

        const storage = firebase.storage();
        await storage.ref('users/' + uid + '/profile.jpg')
                .getDownloadURL()
                .then(image => {
                    const updatedUserProfile = {
                        profilePic: image,
                        displayName: user.displayName
                    }

                    dispatch(userProfile(updatedUserProfile));
                });
    }
}

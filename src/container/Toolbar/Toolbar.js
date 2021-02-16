import React, { useState ,useEffect } from 'react';
import firebase from '../../firebase';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { resetUIState } from '../../store/reducers/UIreducer';
import { resetUserState } from '../../store/reducers/userReducer';

import Logo from '../../component/UI/Logo/Logo';
import UserUI from '../../component/User/UserUI/UserUI';

const StyledToolbar = styled.header`
    top: 0;
    width: 100%;
    height: 4rem;
    margin: 0;
    background-color: white;
    position: fixed;
    z-index: 100;
    display: flex;
    justify-content: space-evenly;

    @media (max-width: 599px) {
        height: 3rem;
    }
`

const Toolbar = props => {


    const [toggleDropdown, setToggleDropdown] = useState(false);
    const [profilePic, setProfilePic] = useState(null);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const user = firebase.auth().currentUser;

        if (props.userData.uid) {
            const storage = firebase.storage();
            storage.ref('users/' + props.userData.uid + '/profile.jpg')
                .getDownloadURL()
                .then(image => setProfilePic(image));
            
            setUsername(user.displayName);
        }
    }, [props.userData]);

    useEffect(() => {
        setProfilePic(props.userProfile.profilePic);
        setUsername(props.userProfile.displayName);
    }, [props.userProfile]);

    const toggleDropdownHandler = () => {
        setToggleDropdown(prev => !prev);
    }

    const signOutHandler = () => {
        firebase.auth().signOut()
            .then(() => {
                props.resetUserState();
                props.resetUIState();
            });
    }

    const moveToProfileHandler = () => {
        props.history.push({
            pathname: '/profile'
        });
    }

    return (
        <StyledToolbar>
            <Logo notShow='notShow'/>
            <UserUI
                profileClicked={toggleDropdownHandler}
                toggleDropdown={toggleDropdown}
                profilePic={profilePic}
                profileChangeClicked={moveToProfileHandler}
                signOut={signOutHandler}
                nickname={username} />
        </StyledToolbar>
    )
};

const mapStateToProps = state => {
    return {
        userData: state.user.userData,
        userProfile: state.ui.userProfile
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetUIState: () => dispatch(resetUIState()),
        resetUserState: () => dispatch(resetUserState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
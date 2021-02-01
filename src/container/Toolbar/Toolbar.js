import React, { useState ,useEffect } from 'react';
import firebase from '../../firebase';
import styled from 'styled-components';
import { connect } from 'react-redux';

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

        if (user){
            setProfilePic(user.photoURL);
            setUsername(user.displayName);
        }
    }, [profilePic, username]);

    const toggleDropdownHandler = () => {
        setToggleDropdown(prev => !prev);
    }

    const signOutHandler = () => {
        firebase.auth().signOut();
    }

    const moveToProfileHandler = () => {
        props.history.push({
            pathname: '/profile'
        });
    }

    const moveToQuizHandler = () => {
        props.history.push({
            pathname: '/quiz'
        })
    }

    return (
        <StyledToolbar>
            <Logo />
            <UserUI
                profileClicked={toggleDropdownHandler}
                toggleDropdown={toggleDropdown}
                profilePic={profilePic}
                profileChangeClicked={moveToProfileHandler}
                signOut={signOutHandler}
                nickname={username} 
                quizClicked/>
        </StyledToolbar>
    )
};

const mapStateToProps = state => {
    return {
        authenticated: state.ui.authenticated
    }
}

export default connect(mapStateToProps, null)(Toolbar);
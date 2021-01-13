import React from 'react';
import styled from 'styled-components';

import Logo from '../Logo/Logo';
import UserUI from '../UserUI/UserUI';

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
`

const toolbar = props => (
    <StyledToolbar>
        <Logo/>
        <UserUI 
            profilePic={props.profilePic}
            profileChangeClicked={props.profileChangeClicked}
            profileClicked={props.profileClicked}
            toggleDropdown={props.toggleDropdown} 
            signOut={props.signOut}
            nickname={props.nickname}/>
    </StyledToolbar>
);

export default React.memo(toolbar);
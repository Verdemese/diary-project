import React from "react";
import styled from "styled-components";

import UserIcon from '../UserIcon/UserIcon';
import Dropdown from '../Dropdown/Dropdown';

const StyledUserUI = styled.div`
    cursor: pointer;    

    & .userUI__container {
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
        margin: 0 1rem;
    }

    & .userIcon {
        height: 2rem;
        width: 2rem;
        display: flex;
        align-items: center;
        margin: 0 1rem;
        z-index: 50;
    }
`

const userUI = props => {

    const nickname = props.nickname || 'user';

    return (
        <StyledUserUI >
            <div className='userUI__container'
            onClick={props.profileClicked}>
                <div className='userIcon'>
                    <UserIcon width='2.5rem' height='2.5rem' profilePic={props.profilePic}/>
                </div>
                <div style={{zIndex: '50'}}>
                    <p>{nickname}▾</p>
                </div>
                <Dropdown 
                    profileChangeClicked={props.profileChangeClicked}
                    toggleDropdown={props.toggleDropdown} signOutClicked={props.signOut}></Dropdown>
            </div>
        </StyledUserUI>
    );
}

export default userUI;

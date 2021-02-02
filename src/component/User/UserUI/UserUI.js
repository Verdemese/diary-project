import React from "react";
import styled from "styled-components";

import UserIcon from '../UserIcon/UserIcon';
import Dropdown from '../../UI/Dropdown/Dropdown';

const StyledUserUI = styled.div`
    cursor: pointer;
    background: white;

    & .userUI__container {
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
        margin: 0 1rem;
    }

    & .userIcon {
        height: 1.5rem;
        width: 1.5rem;
        display: flex;
        align-items: center;
        margin: 0 1rem;
        z-index: 50;
    }

    & .toggle_dropdown {
        font-size: 1rem;
        cursor: pointer;
    }
`

const userUI = props => {

    const username = props.nickname || 'user';

    return (
        <StyledUserUI className='userUI'>
            <div className='userUI__container'
                onClick={props.profileClicked}>
                <div className='userIcon'>
                    <UserIcon location={'toolbar'} profilePic={props.profilePic} />
                </div>
                <div style={{ zIndex: '50' }}>
                    <button className='toggle_dropdown'><p>{username}▾</p></button>
                </div>
                <Dropdown
                    profileChangeClicked={props.profileChangeClicked}
                    toggleDropdown={props.toggleDropdown} 
                    signOutClicked={props.signOut}
                    quizClicked={props.quizClicked}></Dropdown>
            </div>
        </StyledUserUI>
    );
}


export default userUI;

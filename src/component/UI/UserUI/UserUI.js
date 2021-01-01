import React from "react";
import styled from "styled-components";

import userIcon from "../../../assets/userIcon.svg";
import Dropdown from '../Dropdown/Dropdown';

const StyledUserIcon = styled.img`
    width: 100%;
    background-color: grey;
    border-radius: 50%;
    z-index: 60;
`

const userUI = props => {
    return (
        <div >
            <div style={{
                position: 'relative',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                margin: '0 1rem',
            }} onClick={props.profileClicked}>
                <div style={{
                    height: '100%',
                    width: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    margin: '0 1rem',
                    zIndex: '50',
                }}>
                    <StyledUserIcon src={userIcon} alt='userIcon' />
                </div>
                <div style={{zIndex: '50'}}>
                    <p>verdemese▾</p>
                </div>
                <Dropdown toggleDropdown={props.toggleDropdown} signOutClicked={props.signOut}></Dropdown>
            </div>
        </div>
    );
}

export default userUI;

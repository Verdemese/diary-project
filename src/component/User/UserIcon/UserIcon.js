import React from 'react';
import styled from 'styled-components';

import userIcon from '../../../assets/userIcon.svg';

const ImageContainer = styled.div`
    margin: 0.5rem;
    aspect-ratio: 1;
    width: auto;
    background: white;
    box-shadow: 0 0 10px #ccc;
    border-radius: 50%;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
`

const StyledUserIcon = styled.img`
    height: 10rem;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    max-height: 10rem;
    background-color: grey;
    border-radius: 50%;
    margin: none;
    object-fit: cover;
    
    &.toolbar {
        height: 2.5rem;
    }

`

const defaultUserIcon = props => {

    let defaultUserIcon = props.profilePic ? '' : 'default_usericon';

    return (
        <ImageContainer className={defaultUserIcon}>
            <StyledUserIcon
                className={props.location}
                src={props.profilePic ? props.profilePic : userIcon}
                alt='userIcon'
                accept='image/*' />
        </ImageContainer>
    )
}

export default defaultUserIcon;
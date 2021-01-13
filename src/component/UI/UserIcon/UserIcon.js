import React from 'react';
import styled from 'styled-components';

import userIcon from '../../../assets/userIcon.svg';

const ImageContainer = styled.div`
    width: 10rem,
    height: 10rem,
    background: white,
    box-shadow: 0 2px 3px #ccc,
    border-radius: 50%,
    display: flex;
    align-items: center;
    justify-content: center;
`

const StyledUserIcon = styled.img`
    width: ${props => props.width};
    height: ${props => props.height};
    display: flex;
    align-items: center;
    justify-content: center;
    max-height: 10rem;
    background-color: grey;
    border-radius: 50%;
    z-index: 60;
    margin: auto;
    object-fit: cover;
`

const defaultUserIcon = props => (
    <ImageContainer>
        <StyledUserIcon 
            width={props.width}
            height={props.height}
            src={props.profilePic ? props.profilePic : userIcon} 
            alt='userIcon' />
    </ImageContainer>
)

export default defaultUserIcon;
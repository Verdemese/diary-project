import React from 'react';
import styled from 'styled-components';

import userIcon from '../../../assets/userIcon.svg';

const ImageContainer = styled.div`
    margin: 0.5rem;
    max-width: 10rem,
    max-height: 10rem,
    background: white,
    box-shadow: 0 2px 3px #ccc,
    border-radius: 50%,
    display: flex;
    align-items: center;
    justify-content: center;
`

const StyledUserIcon = styled.img`
    width: 10rem;
    height: 10rem;
    display: flex;
    align-items: center;
    justify-content: center;
    max-height: 10rem;
    background-color: grey;
    border-radius: 50%;
    z-index: 60;
    margin: auto;
    object-fit: cover;

    &.toolbar {
        width: 2.5rem;
        height: 2.5rem;
    }

    @media (max-width: 599px) {
        width: 7rem;
        height: 7rem;
    }
`

const defaultUserIcon = props => {

    console.log(props.location);

    return (
        <ImageContainer >
            <StyledUserIcon
                className={props.location}
                src={props.profilePic ? props.profilePic : userIcon}
                alt='userIcon'
                accept='image/*' />
        </ImageContainer>
    )
}

export default defaultUserIcon;
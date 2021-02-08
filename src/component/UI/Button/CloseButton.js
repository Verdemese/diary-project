import React from 'react';
import styled from 'styled-components';

import closeIcon from '../../../assets/test.png';
import clickedCloseIcon from '../../../assets/close-icon-clicked.png';

const StyledCloseButton = styled.button`
    position: fixed;
    background: no-repeat center/100% url(${closeIcon});
    width: 2rem;
    aspect-ratio: 1;
    right: 5%;
    top: 5%;

    &:active, &:hover {
        background: no-repeat center/100% url(${clickedCloseIcon});
    }

`;

const closeButton = (props) => (
    <StyledCloseButton onClick={props.closeClicked}/>
);

export default closeButton;
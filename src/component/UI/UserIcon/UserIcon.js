import React from 'react';
import styled from 'styled-components';

import userIcon from '../../../assets/userIcon.svg';

const StyledUserIcon = styled.img`
    width: 100%;
    background-color: grey;
    border-radius: 50%;
    z-index: 60;
`

const defaultUserIcon = props => (
    <StyledUserIcon src={userIcon} alt='userIcon' />
)

export default defaultUserIcon;
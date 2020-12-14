import React from 'react';
import styled from 'styled-components';

import Logo from '../Logo/Logo';

const StyledToolbar = styled.header`
    width: 100%;
    height: 4rem;
    margin: 0;
    background-color: white;
    position: fixed;
    display: flex;
    justify-content: space-evenly;
`

const toolbar = props => (
    <StyledToolbar>
        <Logo />
        <p>user</p>
    </StyledToolbar>
);

export default toolbar;
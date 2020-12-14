import React from 'react';

import styled from 'styled-components';

const StyledButton = styled.button`
    border: none;
    margin: 0.5rem;
    padding: 1rem;
    background-color: orange;
    border-radius: 1rem;
    width: 100%;
`

const button = props => (
    <StyledButton type={props.buttonType}>{props.children}</StyledButton>
)

export default button;
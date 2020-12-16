import React from "react";

import styled from "styled-components";

const StyledButton = styled.button`
    border: none;
    margin: 0.5rem;
    padding: 1rem;
    border-radius: 1rem;
    width: 100%;
    color: white;
    cursor: pointer;

    &.sign-in {
        background-color: #adcfd3;
    }
    &.sign-in:active {
        background-color: #8aa5a8;
    }


    &.sign-up {
        background-color: #F2BAB8;
    }
    &.sign-up:active {
        background-color: #d9a7a5;
    }
`

const button = props => (
    <StyledButton 
        type={props.buttonType} 
        className={props.funcType}>{props.children}</StyledButton>
)

export default button;
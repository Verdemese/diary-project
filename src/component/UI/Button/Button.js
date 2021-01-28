import React from "react";

import styled from "styled-components";

const StyledButton = styled.button`
    border: none;
    margin: 0.5rem;
    padding: 1rem;
    border-radius: 1rem;
    text-align: center;
    width: 50%;
    color: white;
    cursor: pointer;
    background-color: rgba(229,145,180, 0.5);

    &.sign-in, &.check {
        background-color: #adcfd3;
    }
    &.sign-in:active, &.check:active {
        background-color: #8aa5a8;
    }


    &.sign-up {
        background-color: #F2BAB8;
    }
    &.sign-up:active {
        background-color: #d9a7a5;
    }

    &.cancel {
        background: rgba(204,204,204);
    }
    &.cancel:active {
        background: rgba(170,170,170);
    }
`

const button = props => (
    <StyledButton 
        style={{background: props.backgroundColor}}
        onClick={props.clicked}
        type={props.buttonType} 
        className={props.funcType}>{props.children}</StyledButton>
)

export default button;
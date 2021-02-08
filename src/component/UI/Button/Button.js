import React from "react";

import styled from "styled-components";

const StyledButton = styled.button`
    border: none;
    margin: 0.5rem;
    padding: 0.7rem;
    border-radius: 5px;
    text-align: center;
    width: 50%;
    color: white;
    cursor: pointer;
    background-color: rgba(229,145,180, 0.5);

    &.sign-in, &.check, &.daily {
        background-color: #adcfd3;
    }
    &.sign-in:active, &.check:active, &.daily:active {
        background-color: #8aa5a8;
    }


    &.sign-up, &.monthly {
        background-color: #F2BAB8;
    }
    &.sign-up:active, &.monthly:active {
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
        onClick={props.clicked}
        type={props.buttonType} 
        name={props.buttonName}
        className={props.funcType}>{props.children}</StyledButton>
)

export default button;
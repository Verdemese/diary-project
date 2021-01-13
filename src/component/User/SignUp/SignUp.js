import React from 'react';
import styled from 'styled-components';

import Logo from '../../UI/Logo/Logo';
import Button from '../../UI/Button/Button';

const StyledSignUp = styled.div`
    display: block;
    width: 33rem;
    background-color: white;
    height: 26rem;
    margin: auto;
    border-radius: 40px;

    & > form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 80%;
        height: 100%;
        margin: auto;
        text-align: center;
    }

    & input {
        margin: 0.9rem;
    }

    & input {
        font-size: 1rem;
        width: 80%;
        padding: 10px;
        border: none;
        border-bottom: 1px solid black;
    }

    @media (max-width: 599px) {
        display: block;
        width: 100%;
        background-color: white;
        height: 20rem;
        margin: auto;
        border-radius: 0;
    
        & > form {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 90%;
            height: 100%;
            margin: auto;
            text-align: center;
        }
    
        & input {
            margin: 0.9rem;
        }
    
        & input {
            font-size: 1rem;
            width: 80%;
            padding: 10px;
            border: none;
            border-bottom: 1px solid black;
        }
    }

`

const StyledButtonContainer = styled.div`
    margin-top: 2rem;
    width: 100%;
    padding: 0 2rem;
    text-align: center;
    display: flex;
`


const signUp = props => {

    let errorMessage;

    if (props.signUpError) {
        errorMessage = props.signUpError;
    }

    return (<>
        <Logo></Logo>
        <StyledSignUp>
            <form onSubmit={props.signUpSubmitted}>
                <p>Sign-up</p>
                <input 
                    type="email" 
                    name="email" 
                    placeholder="e-mail" 
                    autoComplete="off"/>
                <input 
                    type="password" 
                    name="password" 
                    placeholder="password" 
                    autoComplete="off"/>
                <input 
                    type="password" 
                    name="checkPassword" 
                    placeholder="check your password" 
                    autoComplete="off"/>
                {errorMessage}
                <StyledButtonContainer>
                    <Button funcType="sign-up" clicked={props.signUpClicked} buttonType='submit'>Sign-Up</Button>
                </StyledButtonContainer>
            </form>
        </StyledSignUp>
    </>)
}


export default signUp;

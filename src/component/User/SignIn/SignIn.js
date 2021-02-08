import React from 'react';
import styled from 'styled-components';

import Logo from '../../UI/Logo/Logo';
import Button from '../../UI/Button/Button';

const StyledSignIn = styled.div`
    display: block;
    width: 30rem;
    background-color: white;
    max-height: auto;
    padding: 10%;
    margin: 2rem auto;
    border-radius: 10px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);

    & > form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: auto;
        text-align: center;
    }

    & h3 {
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
        margin: auto;
        border-radius: 0;
    
        & > form {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
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
    width: 100%;
    padding: 0 2rem;
    text-align: center;
    display: flex;
`

const signIn = props => {

    let signInError;
    
    if (props.signInError) {
        signInError = <p>{props.signInError}</p>
    }

    return (
    <>
        <Logo></Logo>
        <StyledSignIn>
            <h3>Login</h3>
            <form onSubmit={props.signInSubmitted}>
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
                {signInError}
                <StyledButtonContainer>
                    <Button funcType="sign-in" buttonType='submit'>Sign In</Button>
                    <Button funcType="sign-up" clicked={props.signUpClicked} buttonType='button'>Sign Up</Button>
                </StyledButtonContainer>
            </form>
        </StyledSignIn>
    </>
    )
}


export default signIn;

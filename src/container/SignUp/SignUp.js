import React, { useState } from 'react';
import styled from 'styled-components';
import firebase from '../../firebase';

import Logo from '../../component/UI/Logo/Logo';
import Button from '../../component/UI/Button/Button';

const StyledSignUp = styled.div`
    display: block;
    width: 33rem;
    background-color: white;
    height: 26rem;
    margin: 2rem auto;
    border-radius: 10px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);

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
    display: flex;
    justify-content: center;
`


const SignUp = props => {

    const [errorMessage, setErrorMessage] = useState(null);

    const errorHandler = (event) => {
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;
        const checkPassword = event.target.checkPassword.value;

        let text;

        if (password !== checkPassword) {

            text = "Password doesn't match!";

            return setErrorMessage(text);
        }

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => {
                props.history.push({
                    pathname: '/profile'
                })
            })
            .catch(error => {
                if (error.code === 'auth/invalid-email') {
                    text = 'Check your email format!';
                } else if (error.code === 'auth/email-already-in-use') {
                    text = 'Email already exist!';
                } else if (error.code === 'auth/weak-password') {
                    text = 'Password should be at least 6 characters!';
                }

                setErrorMessage(text);
            });
    }

    const backwardHandler = () => {
        props.history.goBack();
    }

    return (<>
        <Logo></Logo>
        <StyledSignUp>
            <form onSubmit={errorHandler}>
                <p>Sign-up</p>
                <input
                    type="email"
                    name="email"
                    placeholder="e-mail"
                    autoComplete="off" />
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    autoComplete="off" />
                <input
                    type="password"
                    name="checkPassword"
                    placeholder="check your password"
                    autoComplete="off" />
                {errorMessage}
                <StyledButtonContainer>
                    <Button funcType='sign-up' buttonType='submit'>Sign-Up</Button>
                    <Button 
                        funcType='cancel'
                        buttonType='button'
                        clicked={backwardHandler}>cancel</Button>
                </StyledButtonContainer>
            </form>
        </StyledSignUp>
    </>)
}


export default SignUp;

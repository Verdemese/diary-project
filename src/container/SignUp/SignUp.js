import React, { useState } from 'react';
import styled from 'styled-components';
import firebase from '../../firebase';

import Button from '../../component/UI/Button/Button';

const StyledSignUp = styled.div`
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
            padding: 10px;
            border: none;
            border-bottom: 1px solid black;
        }
    }

`

const StyledButtonContainer = styled.div`
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
        <StyledSignUp>
            <form onSubmit={errorHandler}>
                <h3>Sign-up</h3>
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

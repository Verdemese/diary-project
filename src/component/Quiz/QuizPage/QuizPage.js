import React from 'react';
import styled from 'styled-components';

import Button from '../../UI/Button/Button';

const StyledQuiz = styled.div`
    width: 100%;
    text-align: center;

    & div:not(.quiz_userInput) {
        padding: 1rem;
        margin: 0.5rem 0;
        border-radius: 5px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    }

    & .quiz_userInput {
        margin: 0.5rem 0;
        position: relative;
    }

    & input {
        font-size: inherit;
        padding: 0.7rem;
        transition: all 0.1s ease-out;
        border-radius: 5px;
        width: 100%;
        background-color: transparent;
        text-align: center;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    }

    & input:focus {
        transform: scale(1.03);
        background: white;
        border: 2px solid RGB(239,192,40);
    }

    & .nextQuestion {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        box-shadow: none;
        overflow: hidden;
        background-color: #EFC050;
        width: 0;
        height: 90%;
        top: 50%;
        transform: translateY(-50%);
        transition: width .2s ease-out;
        right: 1%;
        color: white;
        cursor: pointer;
    }

    & .nextQuestion:hover, .nextQuestion.active {
        width: 10%;
    }

    & .wrongMessage {
       display: none;
       border-radius: 5px;
       color: white;
       background: RGB(214, 80, 118);
       padding: 1%;
       margin: 0.2rem 0;
       font-size: 0.8rem;
    }

    & .wrongMessage.active {
        display: block; 
    }

    & .result_page > * {
        margin: 1rem 0;
        padding: 0.5rem;
    }

    & .result_page > button {
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    }

    @media (max-width: 599px) {
        & .nextQuestion {
            width: 10%;
        }        
    }

`

const quizPage = props => {
    return (
        <StyledQuiz>
            <span>{props.currentOrder}/{props.maxOrder}</span>
            <div>Q. {props.randomWord.word}</div>
            <div className='quiz_userInput'>
                <input
                    type='text'
                    name='answer'
                    autoComplete='off'></input>
                <span
                    className={`nextQuestion ${props.wrongAnswer}`}
                    onClick={props.nextQuestionClicked}>{'>'}</span>
            </div>
            <p className={`wrongMessage ${props.wrongAnswer}`}>Wrong answer! </p>
            <Button buttonType='submit' funcType='daily'>enter</Button>
        </StyledQuiz>
    );
}

export default quizPage;
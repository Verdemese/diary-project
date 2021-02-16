import React from 'react'
import styled from 'styled-components';

import QuizPage from '../QuizPage/QuizPage';
import ResultPage from '../ResultPage/ResultPage';
import Button from '../../UI/Button/Button';

const StyledQuiz = styled.form`
    position: relative;
    width: 30rem;
    background-color: white;
    padding: 5%;
    margin: 2rem auto;
    border-radius: 10px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    & span {
        position: absolute;
        border-radius: 5px;
        right: 3%;
        top: 3%;
        padding: 1%;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    }

    & .quizButton_container {
        width: 70%;
        margin: auto;
        text-align: center;
    }

    @media (max-width: 599px) {
        display: block;
        width: 100%;
        background-color: white;
        margin: 1rem auto;
        border-radius: 0; 
    }

`

const dailyQuiz = props => {
    let showQuiz;

    if (Object.keys(props.randomWord).length <= 0) {
        showQuiz = (
            <ResultPage
                correct={props.correct}
                amountOfWords={props.amountOfWords}
                showResultClicked={props.showResultClicked} />
        );

    } else {
        showQuiz = (
            <QuizPage
                maxOrder={props.maxOrder}
                currentOrder={props.currentOrder}
                randomWord={props.randomWord}
                wrongAnswer={props.wrongAnswer}
                nextQuestionClicked={props.nextQuestionClicked} />
        );
    }

    return (
        <StyledQuiz onSubmit={props.answerSubmitted}>
            <h3>Daily</h3>
            {showQuiz}
            <div className='quizButton_container'>
                <button type='button' onClick={props.retryClicked}>retry</button>
                <Button
                    buttonType='button'
                    funcType='cancel'
                    clicked={props.cancelClicked}>cancel</Button>
            </div>
        </StyledQuiz>
    );
}

export default dailyQuiz;


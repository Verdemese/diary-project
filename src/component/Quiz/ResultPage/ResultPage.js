import React from 'react';
import styled from 'styled-components';

import Button from '../../UI/Button/Button';

const StyledResultPage = styled.div`
    text-align: center;
    width: 100%;

    & > * {
        margin: 1rem 0;
        padding: 0.5rem;
    }

    & button {
        cursor: pointer;
    }

    & div {
        width: 70%;
        margin: auto;
    }

    @media (max-width: 599px) {
        & div { 
            width: 100%;
        }
    }
`

const quizPage = props => {
    return (
        <StyledResultPage>
            <h3>Result: {props.correct}/{props.amountOfWords}</h3>
            <div>
                <button type='button' onClick={props.showResultClicked}>Show result▾</button>
                <Button
                    buttonType='submit'
                    funcType='check'>Save result</Button>
            </div>
        </StyledResultPage>
    );
}

export default quizPage;
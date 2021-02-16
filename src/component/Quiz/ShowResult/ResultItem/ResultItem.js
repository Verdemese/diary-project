import React from 'react';
import styled from 'styled-components';

const StyledList = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    padding: 0.5rem 0;
    margin: 0.5rem 0;
    color: white;

    & span {
        width: 100%;
        word-break: break-all;
        font-size: 0.8rem;
        text-align: center;
    }

    &.correct {
        background: RGB(68, 184, 172);
    }

    &.wrong {
        background: RGB(214, 80, 118);
    }
`

const resultItem = props => {
    let result;

    if (props.correct) {
        result = (
            <StyledList className='correct'>
                <span>{props.correctAnswer.word}</span>
                <span>{props.correctAnswer.meaning}</span>
                <span>{props.userAnswer.meaning + '(O)'}</span>
            </StyledList>
        );
    } else {
        result = (
            <StyledList className='wrong'>
                <span>{props.correctAnswer.word}</span>
                <span>{props.correctAnswer.meaning}</span>
                <span>{props.userAnswer.meaning + '(X)'}</span>
            </StyledList>
        );
    }
    
    return (
        <>
            {result}
        </>
    )
}

export default resultItem;
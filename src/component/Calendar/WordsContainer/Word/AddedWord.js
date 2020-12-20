import React from 'react';
import styled from 'styled-components';

const StyledAddWord = styled.div`
    display: flex;
    margin: 8px 0;
    width: 90%;
    margin: auto;
    justify-content: space-between;
    font-size: 0.7rem;

    & span {
        width: 49%;
        border-bottom: 1px solid black;
    }

    & span:first-child::after {
        content: '';
        border-right: 2px black dotted;
    }

    & p {
        width: 100%;
        margin: 0;
        padding: 15px;
        display: inline-block;
    }

    & span:first-child > p::before {
        margin-right: 10px;
        content: '•';
    }

    & button {
        visibility: hidden;
        transition: all 0.15s;
        transform: translateX(100%);
    }
    
    &.active button {
        visibility: visible;
        transform: translateX(0);
    }
`

const addedWord = props => {

    return (
        <StyledAddWord 
            onMouseEnter={props.mouseEntered} 
            onMouseLeave={props.mouseLeaved}
            className={props.checkHover ? 'active' : null}>
            <span>
                <p>{props.word}</p>
            </span>
            <span>
                <p>{props.meaning}</p>
            </span>
            <button onClick={props.clicked} type='button'>
                X
            </button>
        </StyledAddWord>
    )
}

export default addedWord;
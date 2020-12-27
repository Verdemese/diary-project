import React from 'react';
import styled from 'styled-components';

const StyledAddWord = styled.div`
    display: flex;
    margin: 10px 0;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(196,199,255, 0.3);

    & span {
        width: 49%;
    }

    & span:first-child::after {
        content: '';
        border-right: 2px black dotted;
    }

    & p {
        width: 100%;
        margin: 0;
        padding: 10px;
        display: inline-block;
    }

    & span:first-child > p::before {
        margin-right: 10px;
        content: '•';
    }

    & button {
        border-radius: 50px;
        border: none;
        background-color: rgba(255,34,85, 0.4);
        color: white;
        cursor: pointer;
        width: 1.3rem;
        height: 1.3rem;
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
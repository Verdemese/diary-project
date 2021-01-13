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
        visibility: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        background-color: transparent;
        cursor: pointer;
        font-size: 1.3rem;
    }
    
    &:hover button {
        visibility: visible;
    }

    &:hover button:hover {
        color: red;
    }


`

const addedWord = props => {

    return (
        <StyledAddWord>
            <span>
                <p>{props.word}</p>
            </span>
            <span>
                <p>{props.meaning}</p>
            </span>
            <button onClick={props.clicked} type='button'>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
            </button>
        </StyledAddWord>
    )
}

export default addedWord;
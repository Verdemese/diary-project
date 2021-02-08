import React from 'react';
import styled from 'styled-components';

const StyledAddWord = styled.div`
    display: flex;
    width: 100%;
    margin: 8px 0;
    justify-content: space-between;
    align-items: center;

    & input {
        font-size: 0.8rem;
        transition: all 0.1s ease-out;
        width: 44%;
        border-radius: 5px;
        width: 100%;
        padding: 10px;
        border: 1px solid black;
        background-color: transparent;
    }

    & input:focus {
        transform: scale(1.03);
        background: white;
        border: 2px solid RGB(239,192,40);
    }

    & button {
        border: none;
        background-color: transparent;
        cursor: pointer;
        font-size: 1.3rem;
    }

    & button:hover, button:active {
        color: red;
    }
`

const addWord = props => {
    return (
        <StyledAddWord>
            <input
                autoComplete="off"
                name='word'
                type='text' />
            <input
                autoComplete="off"
                name='meaning'
                type='text' />
            <button onClick={props.clicked} type='button'>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
            </button>
        </StyledAddWord>
    );
}

export default addWord;
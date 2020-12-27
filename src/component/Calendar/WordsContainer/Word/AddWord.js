import React from 'react';
import styled from 'styled-components';

const StyledAddWord = styled.div`
    display: flex;
    width: 100%;
    margin: 8px 0;
    justify-content: space-between;
    align-items: center;

    & span {
        width: 49%;
        border-bottom: 1px solid black;
    }
    
    & span:first-child::after {
        content: '';
        border-right: 2px black dotted;
    }
    
    & input {
        font-size: 0.8rem;
        width: 100%;
        padding: 10px;
        border: none;
        background-color: transparent;
    }

    & button {
        border-radius: 50px;
        border: none;
        background-color: rgba(255,34,85, 0.4);
        color: white;
        cursor: pointer;
        width: 1.3rem;
        height: 1.3rem;
    }
`

const addWord = props => {
    return (
        <StyledAddWord>
            <span>
                <input
                    autoComplete="off"
                    name='word'
                    type='text' />
            </span>
            <span>
                <input
                    autoComplete="off"
                    name='meaning'
                    type='text' />
            </span>
            <button onClick={props.clicked} type='button'>
                X
            </button>
        </StyledAddWord>
    );
}

export default addWord;
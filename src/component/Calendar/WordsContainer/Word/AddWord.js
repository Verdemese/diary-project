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
    
    & input {
        width: 100%;
        padding: 15px;
        border: none;
        background-color: transparent;
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
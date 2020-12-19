import React from 'react';
import styled from 'styled-components';

const StyledWord = styled.div`
    display: flex;
    margin: 8px 0;
    width: 90%;
    margin: auto;
    justify-content: space-between;

    & input {
        width: 100%;
        padding: 15px;
        border: none;
        border-bottom: 1px solid black;
        background-color: transparent;
    }

    & span {
        width: 49%;
    }

    & span:first-child::after {
        content: '';
        border-right: 2px black dotted;
        margin-left: 3px;
    }
`

const word = props => {
    return(
        <StyledWord>
            <span>
                <input autoComplete="off" name='word' type='text' />
            </span>
            <span>
                <input autoComplete="off" name='meaning' type='text' />
            </span>
            <button onClick={props.clicked} type='button'>
                X
            </button>
        </StyledWord>
    );
}

export default word;
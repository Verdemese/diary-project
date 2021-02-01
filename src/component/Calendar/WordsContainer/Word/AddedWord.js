import React from 'react';
import styled from 'styled-components';

const StyledAddWord = styled.div`
    display: flex;
    margin: 10px 0;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    & span {
        background: RGB(0, 155, 119, 0.15);
        border-radius: 5px;
        border: solid black 1px;
        width: 49%;
    }

    & p {
        width: 100%;
        margin: 0;
        padding: 10px;
        display: inline-block;
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

    & input[type="radio"] {
        display: none;
    }



    // delete button을 눌렀을 때
    &.delete_active button {
        display: none;
    }
    
    &.delete_active input[type="radio"] {
        display: block;
    }


    @media (max-width: 599px) {
        & span:first-child > p::before {
            margin: none;
            content: '';
        }

        & button {
            visibility: visible;
        }
    }

`

const addedWord = props => {

    const checked = props.checked;

    return (
        <StyledAddWord className={props.activatedDelete ? 'delete_active' : null}>
            <span>
                <p>{props.word}</p>
            </span>
            <span>
                <p>{props.meaning}</p>
            </span>
            <button onClick={props.clicked} type='button'>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
            </button>
            <input type='radio' checked/>
        </StyledAddWord>
    )
}

export default addedWord;
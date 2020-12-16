import React from 'react';
import styled from 'styled-components';

const StyledWord = styled.div`
    display: flex;
    margin: 8px 0;

    & input {
        padding: 10px;
        width: 100%;
        border: none;
        background-color: #eee;
        box-shadow: 0 2px 3px #ccc;
    }
`

const word = props => {
    return(
        <StyledWord>
            <input type='text'/>
            <input type='text'/>
        </StyledWord>
    );
}

export default word;
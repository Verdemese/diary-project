import React from 'react';
import styled from 'styled-components';

const StyledChangeDateContainer = styled.div`
    color: white;    
    margin-top: 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & button {
        color: inherit;
        font-size: 3rem;
        height: 5rem;
        background-color: transparent;
        border: none;
    }
`

const changeDate = props => {
    
    return (
        <StyledChangeDateContainer>
            <button onClick={props.prevClicked} type="button">{'<'}</button>
                <h1>{props.month}</h1>
            <button onClick={props.nextClicked} type="button">{'>'}</button>
        </StyledChangeDateContainer>
    )
}

export default changeDate;
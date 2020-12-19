import React from 'react';
import styled from 'styled-components';

const StyledChangeDateContainer = styled.div`
    margin-top: 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
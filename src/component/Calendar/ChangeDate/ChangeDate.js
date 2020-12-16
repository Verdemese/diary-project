import React from 'react';
import styled from 'styled-components';

const StyledChangeDateContainer = styled.div`
    margin-top: 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const changeDate = props => {
    
    let month = <h1>{props.month}</h1>;

    return (
        <StyledChangeDateContainer>
            <button onClick={props.prevClicked} type="button">{'<'}</button>
            {month}
            <button onClick={props.nextClicked} type="button">{'>'}</button>
        </StyledChangeDateContainer>
    )
}

export default changeDate;
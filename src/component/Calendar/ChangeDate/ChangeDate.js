import React from 'react';
import styled from 'styled-components';

import Chart from '../../UI/Chart/Chart';

const StyledChangeDateContainer = styled.div`
    color: white;    
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;

    & button {
        color: inherit;
        font-size: 3rem;
        height: 5rem;
        background-color: transparent;
        border: none;
    }

    & button:hover {
        background: rgba(0, 0, 0, 0.2);
    }

    & h1 {
        text-align: center;
    }

    & > * {
        flex: auto;
    }
`

const changeDate = props => {

    return (
        <>
            <StyledChangeDateContainer>
                <button onClick={props.prevClicked} type="button">{'<'}</button>
                <h1>{props.month}</h1>
                <Chart datesDetail={props.datesDetail}/>
                <button onClick={props.nextClicked} type="button">{'>'}</button>
            </StyledChangeDateContainer>
        </>
    )
}

export default changeDate;
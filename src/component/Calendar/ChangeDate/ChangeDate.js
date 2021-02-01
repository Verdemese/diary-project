import React from 'react';
import styled from 'styled-components';

import Chart from '../../UI/Chart/Chart';

const StyledChangeDateContainer = styled.div`
    color: white;    
    display: flex;
    align-items: center;
    jusify-content: space-between;
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

    @media (max-width: 599px) {
        margin-bottom: 0;

    & button {
        font-size: 2rem;
        height: auto;
        width: auto;
    }
    }
`

const changeDate = props => {
    return (
        <>
            <StyledChangeDateContainer className='changeDate'>
                <button onClick={props.prevClicked} type="button">{'<'}</button>
                <h1>{props.month}</h1>
                <Chart 
                    datesDetail={props.datesDetail}
                    quizMethod={props.quizMethod} />
                <button onClick={props.nextClicked} type="button">{'>'}</button>
            </StyledChangeDateContainer>
        </>
    )
}

export default changeDate;
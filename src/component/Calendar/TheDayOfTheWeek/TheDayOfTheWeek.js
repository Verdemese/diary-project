import React from 'react';
import styled from 'styled-components';

const StyledDaysContainer = styled.div`
    margin: auto;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    background-color: white;
    border-bottom: 2px solid black;
    
    & span:first-child {
        color: red;
    }

    & span:last-child {
        color: grey;
    }
`

const DAY_OF_THE_WEEK = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

const theDayOfTheWeek = props => {
    const days = DAY_OF_THE_WEEK.map(day => {
        return <span key={day}>{day.toUpperCase()}</span>
    })

    return (
        <StyledDaysContainer>
            {days}
        </StyledDaysContainer>
    )
}

export default theDayOfTheWeek;
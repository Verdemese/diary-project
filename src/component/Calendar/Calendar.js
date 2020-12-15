import React from "react";
import styled from 'styled-components';

import CalendarNumber from './CalendarNumber/CalendarNumber';
import TheDayOfTheWeek from './TheDayOfTheWeek/TheDayOfTheWeek';

const StyledCalendar = styled.div`
    width: 100%;
    height: 28rem;
    background-color: white;
    margin: auto;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
`

const calendar = props => {

    const dateDetail = props.datesDetail
        .map(date => {
            return <CalendarNumber 
                key={date.dayOfTheWeek + date.date}
                dayOfTheWeek={date.dayOfTheWeek + 1}>{date.date}</CalendarNumber>
                //grid에서 0은 작동하지 않기 떄문
        });

    return (
        <div style={{width: '35rem', margin: 'auto'}}>
            <div>
                <p>next</p>
                <p>today's date</p>
                <p>prev</p>
            </div>
            <TheDayOfTheWeek />
            <StyledCalendar>
                {dateDetail}
            </StyledCalendar>
        </div>
    )
}

export default calendar;
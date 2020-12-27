import React from "react";
import styled from 'styled-components';

import CalendarNumber from './CalendarNumber/CalendarNumber';
import TheDayOfTheWeek from './TheDayOfTheWeek/TheDayOfTheWeek';
import ChangeDate from './ChangeDate/ChangeDate';

const StyledCalendar = styled.div`
    width: 100%;
    height: auto;
    background-color: transparent;
    color: white;
    margin: auto;
    display: grid;
    
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(5, 1fr);
`

const calendar = props => {

    const datesDetail = props.datesDetail
        .map(date => {
            return <CalendarNumber 
                id={date.id}
                clicked={() => props.selectedMemo(date)}
                key={date.dayOfTheWeek + date.date}
                dayOfTheWeek={date.dayOfTheWeek + 1}
                active={date.checked} >{date.date}</CalendarNumber>
                //dayOfTheWeek = 0, 1, 2 ... 6 grid에서 0은 작동하지 않는다.
        });
    
    return (
        <div style={{width: '32rem', margin: 'auto'}}>
            <ChangeDate 
                prevClicked={props.previousMonth}
                nextClicked={props.nextMonth}
                month={props.selectedMonth}/>
            <TheDayOfTheWeek />
            <StyledCalendar>
                {datesDetail}
            </StyledCalendar>
        </div>
    )
}

export default calendar;
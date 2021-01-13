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

const TodayButton = styled.button`
    border: none;
    padding: 0.3rem;
    background: #34eb83;
    color: black;
    border-radius: 10px;
    right: 10%;
    position: absolute;
`

const calendar = props => {

    const datesDetail = props.datesDetail
        .map(date => {
            return <CalendarNumber 
                id={date.id}
                amountWords={date.words.length}
                clicked={() => props.selectedDate(date)}
                key={date.dayOfTheWeek + date.date}
                dayOfTheWeek={date.dayOfTheWeek + 1}
                active={date.checked} >{date.date}</CalendarNumber>
                //dayOfTheWeek = 0, 1, 2 ... 6 grid에서 0은 작동하지 않는다.
        });
    
    return (
        <div style={{width: '32rem', margin: 'auto', marginTop: '3rem'}}>
            <ChangeDate 
                prevClicked={props.previousMonth}
                nextClicked={props.nextMonth}
                month={props.selectedMonth}/>
            <TheDayOfTheWeek />
            <StyledCalendar>
                {datesDetail}
            </StyledCalendar>
            <TodayButton onClick={props.todayClicked}><p>Today: {props.today}</p></TodayButton>
        </div>
    )
}

export default calendar;
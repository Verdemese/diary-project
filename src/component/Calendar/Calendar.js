import React from 'react';
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
    width: 4rem;
    background: #009B77;
    font-size: inherit;
    color: white;
    border-radius: 10px;
    bottom: 1%;
    right: 1%;
    position: absolute;
    cursor: pointer;
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
        <div style={
            {
                width: '32rem',
                margin: 'auto',
                marginTop: '3rem',
                padding: '0.5rem',
                boxShadow: '0 1px 5px rgba(0, 0, 0, 0.3)'
            }
            }>
            <ChangeDate 
                prevClicked={props.previousMonth}
                nextClicked={props.nextMonth}
                month={props.selectedMonth}
                datesDetail={props.datesDetail}/>
            <TheDayOfTheWeek />
            <StyledCalendar>
                {datesDetail}
            </StyledCalendar>
            <TodayButton onClick={props.todayClicked}><p>Today</p></TodayButton>
        </div>
    )
}

export default calendar;
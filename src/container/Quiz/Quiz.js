import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import CalendarBuilder from '../CalendarBuilder/CalendarBuilder';
import Backdrop from '../../component/UI/Backdrop/Backdrop';
import Calendar from '../../component/Calendar/Calendar'
import ChangeDate from '../../component/Calendar/ChangeDate/ChangeDate';
import TheDayOfTheWeek from '../../component/Calendar/TheDayOfTheWeek/TheDayOfTheWeek'
import CalendarNumber from '../../component/Calendar/CalendarNumber/CalendarNumber';

import {
    nextMonth,
    prevMonth,
    saveDatesDetail,
    storeDatesDetail,
} from '../../store/reducers/userReducer'
import { render } from '@testing-library/react';


const StyledQuiz = styled.div`
    display: block;
    width: 30rem;
    background-color: white;
    height: 26rem;
    margin: 2rem auto;
    border-radius: 10px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);

    @media (max-width: 599px) {
        display: block;
        width: 100%;
        background-color: white;
        height: 20rem;
        margin: auto;
        border-radius: 0;
    }

`

const Modal = styled.div`
    visibility: hidden;
    position: fixed;
    z-index: 500;
    left: 50%;
    width: 25rem;
    height: auto;
    top: 10%;
    border-radius: 5px;
    transform: translateX(-50%);
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.4);
    margin: auto;
    opacity: 0;
    transition: opacity 0.3s ease-out;

    &.opened {
        visibility: visible;
        opacity: 1;
    }

    @media(max-width: 599px) {
        width: 100%;
        top: 5%;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
    }
`

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

const DAY_OF_THE_WEEK = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

class Quiz extends React.Component {

    state = {
        modalOpened: false,
        quizMethod: '',
        //details: []
    }

    componentDidMount() {
        this.props.saveDatesDetail({
            uid: this.props.userData.uid,
            year: this.props.today.year,
            month: this.props.today.month
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.dateForChange !== this.props.dateForChange) {
            this.props.saveDatesDetail({
                uid: this.props.userData.uid,
                year: this.props.dateForChange.year,
                month: this.props.dateForChange.month
            });
        }
    }

    nextMonthHandler = () => {
        let year = this.props.dateForChange.year;
        let month = this.props.dateForChange.month + 1; //현재의 month에서 1을 더함

        //현재 today.month가 11인 상태에서 1을 더하여 11을 초과한 경우
        //다음 해로 이동함과 동시에 월을 1월 1일로 초기화

        const lastDay = new Date(year, month + 1, 0);
        const datesDetail = [];
        const dateObejct = {}

        for (let date = 1; date <= lastDay.getDate(); date++) {

            const dayOfTheWeek = new Date(year, month, date);

            dateObejct[date] = {
                date,
                dayOfTheWeek: dayOfTheWeek.getDay(),
                id: date + DAY_OF_THE_WEEK[dayOfTheWeek.getDay()],
                words: []
            }

            datesDetail.push(dateObejct[date]);
        }

        this.props.nextMonth();
        this.props.datesDetailForClient(datesDetail);
    }

    prevMonthHandler = () => {
        let year = this.props.dateForChange.year;
        let month = this.props.dateForChange.month - 1;

        //현재 state.month가 0인 상태에서 1을 빼서 0미만이 된 경우
        //이전 해로 이동함과 동시에 월을 12월 1일로 초기화        

        const lastDay = new Date(year, month + 1, 0);
        const datesDetail = [];
        const dateObejct = {}

        for (let date = 1; date <= lastDay.getDate(); date++) {

            const dayOfTheWeek = new Date(year, month, date);

            dateObejct[date] = {
                date,
                dayOfTheWeek: dayOfTheWeek.getDay(),
                id: date + DAY_OF_THE_WEEK[dayOfTheWeek.getDay()],
                words: []
            }

            datesDetail.push(dateObejct[date]);
        }

        this.props.prevMonth();
        this.props.datesDetailForClient(datesDetail);
    }

    dailyClickHandler = () => {
        this.setState({ modalOpened: true, quizMethod: 'daily' });
    }

    monthlyClickHandler = () => {
        this.setState({ modalOpened: true, quizMethod: 'monthly' });
    }


    render() {

        let dates = this.props.datesDetail.map(date => {

            if (date.words.length > 0) console.log(1);

            return (
                <CalendarNumber
                    id={date.id}
                    amountWords={date.words.length}
                    //clicked={() => props.selectedDate(date)}
                    key={date.dayOfTheWeek + date.date}
                    dayOfTheWeek={date.dayOfTheWeek + 1}>{date.date}</CalendarNumber>
            );
            //dayOfTheWeek = 0, 1, 2 ... 6 grid에서 0은 작동하지 않는다.
        });

        let modal
        const month = `${this.props.dateForChange.year}-${this.props.dateForChange.month + 1}`

        if (this.state.quizMethod === 'daily') {
            modal = (
                <Modal className={this.state.modalOpened ? 'opened' : null}>
                    <ChangeDate
                        month={month}
                        prevClicked={this.prevMonthHandler}
                        datesDetail={this.props.datesDetail}
                        nextClicked={this.nextMonthHandler} 
                        quizMethod={this.state.quizMethod}/>
                    <TheDayOfTheWeek />
                    <StyledCalendar >
                        {dates}
                    </StyledCalendar>
                </Modal>
            );
        } else if (this.state.quizMethod === 'monthly') {
            modal = (
                <Modal className={this.state.modalOpened ? 'opened' : null}>
                    <ChangeDate
                        month={month}
                        prevClicked={this.prevMonthHandler}
                        datesDetail={this.props.datesDetail}
                        nextClicked={this.nextMonthHandler} 
                        quizMethod={this.state.quizMethod}/>
                </Modal>
            )
        }

        return (
            <>
                <StyledQuiz>
                    <div>
                        <button type='button' onClick={this.dailyClickHandler}>daily</button>
                        <button type='button' onClick={this.monthlyClickHandler}>monthly</button>
                    </div>
                </StyledQuiz>
                <Backdrop
                    opened={this.state.modalOpened}
                    clicked={() => this.setState({ modalOpened: false })} />
                {modal}
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        today: state.user.today,
        datesDetail: state.user.datesDetail,
        userData: state.user.userData,
        dateForChange: state.user.dateForChange
    }
}

const mapDispatchToProps = dispatch => {
    return {
        datesDetailForClient: (obj) => dispatch(storeDatesDetail(obj)),
        saveDatesDetail: (obj) => dispatch(saveDatesDetail(obj)),
        nextMonth: () => dispatch(nextMonth()),
        prevMonth: () => dispatch(prevMonth())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
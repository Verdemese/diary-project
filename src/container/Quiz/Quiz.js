import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import ChangeDate from '../../component/Calendar/ChangeDate/ChangeDate';
import TheDayOfTheWeek from '../../component/Calendar/TheDayOfTheWeek/TheDayOfTheWeek';
import CalendarNumber from '../../component/Calendar/CalendarNumber/CalendarNumber';
import Button from '../../component/UI/Button/Button';

import Modal from '../../component/UI/Modal/Modal';

import {
    nextMonth,
    prevMonth,
    saveDatesDetail,
    storeDatesDetail,
    selectDate,
    loadToday
} from '../../store/reducers/userReducer';


const StyledQuiz = styled.div`
    display: block;
    width: 30rem;
    background-color: white;
    padding: 5%;
    max-height: 26rem;
    margin: 2rem auto;
    border-radius: 10px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);

    & > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    & .quiz_method {
        width: 100%;
        display: flex;
    }

    & h3 {
        text-align: center;
    }

    @media (max-width: 599px) {
        display: block;
        width: 100%;
        background-color: white;
        max-height: auto;
        margin: 1rem auto;
        border-radius: 0;
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

class Quiz extends React.Component {

    state = {
        modalOpened: false,
        quizMethod: '',
        //details: []
        message: ''
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

    componentWillUnmount() {
        //component가 unmount 될 때 dateForChange를 초기화 함.
        this.props.loadToday();
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
                id: date + this.props.DAY_OF_THE_WEEK[dayOfTheWeek.getDay()],
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
                id: date + this.props.DAY_OF_THE_WEEK[dayOfTheWeek.getDay()],
                words: []
            }

            datesDetail.push(dateObejct[date]);
        }

        this.props.prevMonth();
        this.props.datesDetailForClient(datesDetail);
    }

    closeModalHandler = () => {
        this.setState({ modalOpened: false });
    }

    dailyClickHandler = () => {
        this.setState({ modalOpened: true, quizMethod: 'daily' });
    }

    monthlyClickHandler = () => {
        this.setState({ modalOpened: true, quizMethod: 'monthly' });
    }

    moveToDailyHandler = date => {
        if (date.words.length > 0) {
            this.props.selectDate(date);
            this.props.history.push({
                pathname: `/quiz/${this.state.quizMethod}/${this.props.dateForChange.month + 1}-${date.date}`
            });
        } else {
            this.setState({ message: 'Add word first!' });
        }
    }

    moveToMonthlyHandler = () => {

        let checkEmptyMonth = [];

        this.props.datesDetail.forEach(date => {
            checkEmptyMonth = [...checkEmptyMonth, ...date.words];
        })

        if (checkEmptyMonth.length > 0) {
            this.props.history.push({
                pathname: `/quiz/${this.state.quizMethod}/${this.props.dateForChange.month + 1}`
            });
        } else {
            this.setState({ message: 'Add word first!' });
        }
    }

    cancelHandler = () => {
        this.props.history.goBack();
    }

    render() {
        let dates = this.props.datesDetail.map(date => {
            return (
                <CalendarNumber
                    id={date.id}
                    amountWords={date.words.length}
                    clicked={() => this.moveToDailyHandler(date)}
                    key={date.dayOfTheWeek + date.date}
                    dayOfTheWeek={date.dayOfTheWeek + 1}>{date.date}</CalendarNumber>
            );
        });

        let modal
        const month = `${this.props.dateForChange.year}-${this.props.dateForChange.month + 1}`

        if (this.state.quizMethod === 'daily') {
            modal = (
                <>
                    <ChangeDate
                        month={month}
                        prevClicked={this.prevMonthHandler}
                        datesDetail={this.props.datesDetail}
                        nextClicked={this.nextMonthHandler}
                        quizMethod={this.state.quizMethod} />
                    <TheDayOfTheWeek />
                    <StyledCalendar >
                        {dates}
                    </StyledCalendar>
                    <button
                        type='button'
                        className='close'
                        onClick={this.closeModalHandler} />
                </>
            );
        } else if (this.state.quizMethod === 'monthly') {
            modal = (
                <>
                    <ChangeDate
                        month={month}
                        prevClicked={this.prevMonthHandler}
                        datesDetail={this.props.datesDetail}
                        nextClicked={this.nextMonthHandler}
                        quizMethod={this.state.quizMethod} />
                    <button
                        type='button'
                        className='close'
                        onClick={this.closeModalHandler} />
                    <button
                        type='button'
                        className='check'
                        onClick={this.moveToMonthlyHandler} />
                </>
            );
        }

        return (
            <>
                <Modal
                    classForQuiz='quiz'
                    modalOpened={this.state.modalOpened}
                    cancelModal={this.closeModalHandler}>
                    {modal}
                </Modal>
                <StyledQuiz>
                    <h3>Choose quiz method!</h3>
                    <div>
                        <div className='quiz_method'>
                            <Button buttonType='button' funcType='daily' clicked={this.dailyClickHandler}>daily</Button>
                            <Button buttonType='button' funcType='monthly' clicked={this.monthlyClickHandler}>monthly</Button>
                        </div>
                        <Button buttonType='button' funcType='cancel' clicked={this.cancelHandler}>cancel</Button>
                    </div>
                </StyledQuiz>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        today: state.user.today,
        datesDetail: state.user.datesDetail,
        userData: state.user.userData,
        dateForChange: state.user.dateForChange,

        DAY_OF_THE_WEEK: state.ui.DAY_OF_THE_WEEK
    }
}

const mapDispatchToProps = dispatch => {
    return {
        datesDetailForClient: (obj) => dispatch(storeDatesDetail(obj)),
        saveDatesDetail: (obj) => dispatch(saveDatesDetail(obj)),
        nextMonth: () => dispatch(nextMonth()),
        prevMonth: () => dispatch(prevMonth()),
        selectDate: (obj) => dispatch(selectDate(obj)),
        loadToday: () => dispatch(loadToday())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
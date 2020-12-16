import React, { Component } from "react";
//import styled from "styled-component";

import Calendar from '../../component/Calendar/Calendar';
import Modal from '../../component/UI/Modal/Modal';
import WordContainer from '../../component/Calendar/WordsContainer/WordsContainer';

class CalendarControl extends Component {

    state = {
        datesDetail: [],
        //{
        //    checked: false,
        //    dayOftheWeek: 'monday',
        //    words: [{
        //        competition: '경쟁'
        //    }]
        //}


        //selectedYear
        year: 0,
        month: 0,
        date: 0,
        modalOpened: false,

    }

    componentDidMount() {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();

        const lastDay = new Date(year, month + 1, 0);
        const datesDetail = [];
        const dateContainer = {}
        
        for (let date = 1; date <= lastDay.getDate(); date++) {

            const dayOfTheWeek = new Date(year, month, date);

            dateContainer[date] = {
                date,
                checked: date === today.getDate() ? true : false,
                dayOfTheWeek: dayOfTheWeek.getDay(),
                words: {
                    competition: '경쟁'
                }
            }

            datesDetail.push(dateContainer[date]);
        }

        this.setState({
            today: today,
            year: year,
            month: month,
            datesDetail: datesDetail,
        });
    }

    nextMonthHandler = () => {
        let year = this.state.year;
        let month = this.state.month + 1; //현재의 month에서 1을 더함

        //현재 state.month가 11인 상태에서 1을 더하여 11을 초과한 경우
        //다음 해로 이동함과 동시에 월을 1월 1일로 초기화
        if (month > 11) {
            year = year + 1;
            month = 0;
        }

        const lastDay = new Date(year, month + 1, 0);
        const datesDetail = [];
        const dateContainer = {}

        for (let date = 1; date <= lastDay.getDate(); date++) {

            const dayOfTheWeek = new Date(year, month, date);

            dateContainer[date] = {
                date,
                checked: false,
                dayOfTheWeek: dayOfTheWeek.getDay(),
                words: {
                    competition: '경쟁'
                }
            }

            datesDetail.push(dateContainer[date]);
        }

        this.setState({
            year: year,
            month: month,
            datesDetail: datesDetail,
        });
    }

    previousMonthHandler = () => {
        let year = this.state.year;
        let month = this.state.month - 1;

        //현재 state.month가 0인 상태에서 1을 빼서 0미만이 된 경우
        //이전 해로 이동함과 동시에 월을 12월 1일로 초기화        
        if (month < 0) {
            year = year - 1;
            month = 11;
        }

        const lastDay = new Date(year, month + 1, 0);
        const datesDetail = [];
        const dateContainer = {}

        for (let date = 1; date <= lastDay.getDate(); date++) {

            const dayOfTheWeek = new Date(year, month, date);

            dateContainer[date] = {
                date,
                checked: false,
                dayOfTheWeek: dayOfTheWeek.getDay(),
                words: [{
                    word: 'competition',
                    meaning: '경쟁',
                    id: 'competition경쟁'
                }]
            }

            datesDetail.push(dateContainer[date]);
        }

        this.setState({
            year: year,
            month: month,
            datesDetail: datesDetail,
        });
    }

    selectMemoHandler = () => {
        this.setState({ modalOpened: true });
    }

    closeModalHandler = () => {
        this.setState({ modalOpened: false });
    }

    render() {

        const selectedMonth = `${this.state.year}-${this.state.month + 1}`;

        console.log(this.state.modalOpened);

        return (
            <>
                <Modal 
                    modalOpened={this.state.modalOpened}
                    cancelModal={this.closeModalHandler}>
                        <WordContainer />
                    </Modal>
                <Calendar
                    selectedMemo={this.selectMemoHandler}
                    nextMonth={this.nextMonthHandler}
                    previousMonth={this.previousMonthHandler}
                    datesDetail={this.state.datesDetail}
                    selectedMonth={selectedMonth}/>
            </>
        )
    }

}

export default CalendarControl;
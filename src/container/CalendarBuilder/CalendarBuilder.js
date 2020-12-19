import React, { Component } from "react";
//import styled from "styled-component";

import Calendar from '../../component/Calendar/Calendar';
import Modal from '../../component/UI/Modal/Modal';
import WordContainer from '../../component/Calendar/WordsContainer/WordsContainer';

const DAY_OF_THE_WEEK = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

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

        //selected date
        selectedDate: {},

        //add word black
        addWord: true,
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
                //checked: false,
                dayOfTheWeek: dayOfTheWeek.getDay(),
                id: date + `${DAY_OF_THE_WEEK[dayOfTheWeek.getDay()]}`,
                words: [{
                    word: 'competition',
                    meaning: '경쟁',
                    //id: 'competition경쟁'
                }]
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


    //다음 달
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
                //checked: false,
                dayOfTheWeek: dayOfTheWeek.getDay(),
                id: date + DAY_OF_THE_WEEK[dayOfTheWeek.getDay()],
                words: [{
                    word: 'competition',
                    meaning: '경쟁',
                    //id: 'competition경쟁'
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

    // 이전 달 
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
                //checked: false,
                dayOfTheWeek: dayOfTheWeek.getDay(),
                id: date + DAY_OF_THE_WEEK[dayOfTheWeek.getDay()],
                words: [{
                    word: 'competition',
                    meaning: '경쟁',
                    //id: 'competition경쟁'
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

    //특정 date를 클릭했을 때 
    selectDateHandler = (id) => {
        this.setState({ modalOpened: true });

        const date = [...this.state.datesDetail]
            .find(date => date.id === id);

        this.setState({ selectedDate: date });
    }

    //backdrop이나 modal을 닫을 때
    closeModalHandler = () => {
        this.setState({ modalOpened: false });
    }

    submitHandler = (event) => {

        event.preventDefault();

        let words = event.target.word; 
        let meanings = event.target.meaning;

        if (!words || !meanings) return;

        if (!words.length || !meanings.length) {
            words = [words];
            meanings = [meanings];
        } else {
            words = [...words];
            meanings = [...meanings];
        }
        
        const selectedDate = {...this.state.selectedDate}
        const container = [];

        words.forEach((word, index) => {

            if (!word.value || !meanings[index].value) return;

            const obj = {}
            obj.word = word.value;
            obj.meaning = meanings[index].value;

            container.push(obj);
        })
        
        selectedDate.words = container;

        this.setState({ selectedDate: selectedDate});
    }

    addWordHandler = () => {
        const selectedDate = {...this.state.selectedDate};
        const words = [...this.state.selectedDate.words];
        const addWord = {
            word: '',
            meaning: ''
        };

        words.push(addWord);

        selectedDate.words = words;

        this.setState({ selectedDate: selectedDate });
    }

    deleteWordHandler = (word) => {
        const selectedDate = {...this.state.selectedDate};

        const deleteWord = selectedDate.words.findIndex(item => item === word);

        selectedDate.words.splice(deleteWord, 1);

        this.setState({ selectedDate: selectedDate });
    }

    render() {

        const selectedMonth = `${this.state.year}-${this.state.month + 1}`;

        console.log(this.state.selectedDate.words);

        return (
            <>
                <Modal 
                    modalOpened={this.state.modalOpened}
                    cancelModal={this.closeModalHandler}>
                        <WordContainer 
                            clicked={this.addWordHandler}
                            deleteWord={this.deleteWordHandler}
                            submitted={(event) => this.submitHandler(event)}
                            words={this.state.selectedDate.words}/>
                    </Modal>
                <Calendar
                    selectedMemo={this.selectDateHandler}
                    nextMonth={this.nextMonthHandler}
                    previousMonth={this.previousMonthHandler}
                    datesDetail={this.state.datesDetail}
                    selectedMonth={selectedMonth}/>
            </>
        )
    }

}

export default CalendarControl;
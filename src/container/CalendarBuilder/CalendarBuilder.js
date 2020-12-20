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
        //    word: 'competition',
        //    meaning: '경쟁',
        //    id: 'competition경쟁'
        //}


        //selectedYear
        year: 0,
        month: 0,
        date: 0,
        modalOpened: false,

        //selected date
        selectedDate: {},

        //added words
        savedDate: {},
    }


    //처음 render했을 때
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
                dayOfTheWeek: dayOfTheWeek.getDay(),
                id: date + `${DAY_OF_THE_WEEK[dayOfTheWeek.getDay()]}`,
                words: []
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
                dayOfTheWeek: dayOfTheWeek.getDay(),
                id: date + DAY_OF_THE_WEEK[dayOfTheWeek.getDay()],
                words: []
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
                dayOfTheWeek: dayOfTheWeek.getDay(),
                id: date + DAY_OF_THE_WEEK[dayOfTheWeek.getDay()],
                words: []
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

        this.setState({ selectedDate: date, savedDate: date });
    }



    //backdrop이나 modal을 닫을 때
    closeModalHandler = () => {
        this.setState({ modalOpened: false });
    }



    //save버튼을 눌렀을 때
    saveHandler = (event) => {
        event.preventDefault();

        let words = event.target.word; 
        let meanings = event.target.meaning;

        if (!words || !meanings) return;

        if (!words.length || !meanings.length) { //array가 아닐 때
            words = [words];
            meanings = [meanings];
        } else {
            words = [...words];
            meanings = [...meanings];
        }
        
        let savedDate = {...this.state.savedDate};
        const container = [];

        words.forEach((word, index) => {

            if (!word.value || !meanings[index].value) return;

            const obj = {}
            obj.word = word.value;
            obj.meaning = meanings[index].value;
            obj.id = word.value + meanings[index].value;
            obj.hovered = false;

            container.push(obj);
        })
        
        savedDate.words = [...savedDate.words, ...container];

        this.setState({ savedDate: savedDate });

        //input value를 초기화함
        words.forEach((word, index) =>{
            meanings[index].value = ''
            word.value = '';
        });
    }



    //+버튼을 눌렀을 때
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



    //input 상태의 word box를 삭제할 때
    deleteWordHandler = (word) => {
        const selectedDate = {...this.state.selectedDate};

        const deleteWord = selectedDate.words.findIndex(item => item === word);

        selectedDate.words.splice(deleteWord, 1);

        this.setState({ selectedDate: selectedDate });
    }



    // saved된 date에서 word를 삭제할 때 
    deleteSavedWordHandler = (word) => {
        let savedDate = {...this.state.savedDate};

        const deleteWord = savedDate.words.findIndex(item => item === word);

        savedDate.words.splice(deleteWord, 1);

        this.setState({ savedDate: savedDate });
    }



    //save된 word box에서 마우스가 들어올 때
    wordEnterHandler = (word) => {
        const savedDate = {...this.state.savedDate};

        const checkHover = savedDate.words.findIndex(item => item === word);

        savedDate.words[checkHover].hovered = true;

        console.log(savedDate.words[checkHover].hovered);

        this.setState({ savedDate: savedDate });
    }



    //save된 word box에서 마우스가 나갈때
    wordLeaveHandler = (word) => {
        const savedDate = {...this.state.savedDate};

        const checkHover = savedDate.words.findIndex(item => item === word);

        savedDate.words[checkHover].hovered = false;

        console.log(savedDate.words[checkHover].hovered);

        this.setState({ savedDate: savedDate });
    }



    render() {

        console.log(this.state.selectedDate);

        const selectedMonth = `${this.state.year}-${this.state.month + 1}`;

        return (
            <>
                <Modal 
                    modalOpened={this.state.modalOpened}
                    cancelModal={this.closeModalHandler}>
                        <WordContainer 
                        //input 상태의 word box
                            clicked={this.addWordHandler}
                            deleteWord={this.deleteWordHandler}
                            words={this.state.selectedDate.words}
                            //wordChange={this.wordChangeHandler}
                            
                        //save된 word box
                            savedWords={this.state.savedDate.words}
                            deleteSavedWord={this.deleteSavedWordHandler}
                            mouseEntered={this.wordEnterHandler}
                            mouseLeaved={this.wordLeaveHandler}
                        
                        //save 버튼
                            submitted={(event) => this.saveHandler(event)}
                            />
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
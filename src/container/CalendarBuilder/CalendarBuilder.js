import React, { Component } from "react";
import axios from '../../aixos-wordsDate'

import Calendar from '../../component/Calendar/Calendar';
import Modal from '../../component/UI/Modal/Modal';
import WordContainer from '../../component/Calendar/WordsContainer/WordsContainer';

const DAY_OF_THE_WEEK = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

const INPUTBOXES = [
    {
        word: '',
        meaning: ''
    }
];

class CalendarControl extends Component {

    state = {
        datesDetail: [],
        /*{
            word: 'competition',
            meaning: '경쟁',
            id: 'competition경쟁'
        }*/


        //selectedYear
        today: {
            year: 0,
            month: 0,
            date: 0
        },
        year: 0,
        month: 0,
        date: 0,
        modalOpened: false,

        //selected date
        selectedDate: {},

        //added words
        savedDate: {},
        // {date: 21, dayOfTheWeek: 4, id: "21thu", words: Array(1)}


        //input box
        inputBoxes: [{
            word: '',
            meaning: ''
        }],

        //load spinner
        isLoading: false,
    }


    //처음 render했을 때
    componentDidMount() {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();

        const lastDay = new Date(year, month + 1, 0);
        const datesDetail = [];
        let updatedDetail = [];
        const dateObejct = {}

        for (let date = 1; date <= lastDay.getDate(); date++) {

            const dayOfTheWeek = new Date(year, month, date);

            dateObejct[date] = {
                date,
                dayOfTheWeek: dayOfTheWeek.getDay(),
                id: date + `${DAY_OF_THE_WEEK[dayOfTheWeek.getDay()]}`,
                words: []
            }

            datesDetail.push(dateObejct[date]);
        }

        this.setState({
            year,
            month,
            datesDetail: datesDetail,
            today: {
                year,
                month,
                date: today.getDate(),
            }
        });



        //추후 변경
        axios.get(`/${this.props.userUID}/${year}/${month}.json`)
            .then(response => {
                for (let key in response.data) {
                    if (response.data[key].year === year && response.data[key].month === month) {
                        updatedDetail = [...response.data[key].datesDetail];
                        updatedDetail.forEach(date => {
                            if (!date.words) {
                                date.words = [];
                            }
                        });

                        this.setState({ datesDetail: updatedDetail });
                    }
                }
            })
    }



    componentDidUpdate(prevProps, prevState) {
        if (prevState.year !== this.state.year || prevState.month !== this.state.month) {
            let updatedDetail;

            axios.get(`/${this.props.userUID}/${this.state.year}/${this.state.month}.json`)
                .then(response => {
                    for (let key in response.data) {
                        if (response.data[key].year === this.state.year && response.data[key].month === this.state.month) {
                            updatedDetail = [...response.data[key].datesDetail];

                            updatedDetail.forEach(date => {
                                if (!date.words) {
                                    date.words = [];
                                }
                            });

                            this.setState({ datesDetail: updatedDetail });
                        }
                    }
                })
        }

        return prevState !== this.state;
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

        this.setState({
            year: year,
            month: month,
            datesDetail: datesDetail,
        });
    }



    //특정 date를 클릭했을 때 
    selectDateHandler = (inputDate) => {

        document.querySelector('input[name="word"]').value = '';
        document.querySelector('input[name="meaning"]').value = '';

        this.setState({ modalOpened: true });

        const date = [...this.state.datesDetail]
            .find(date => date === inputDate);

        this.setState({ selectedDate: date, savedDate: date });
    }



    //backdrop이나 modal을 닫을 때
    closeModalHandler = () => {
        this.setState({ modalOpened: false, inputBoxes: INPUTBOXES });
    }



    //save버튼을 눌렀을 때
    saveHandler = (event) => {
        event.preventDefault();

        const datesDetail = [...this.state.datesDetail];

        const updateMonth = {
            year: this.state.year,
            month: this.state.month,
            datesDetail: datesDetail
        }

        let words = event.target.word;
        let meanings = event.target.meaning;

        if (words === undefined || meanings === undefined) {
            words = [];
            meanings = [];
        };

        //if (!words.value || !meanings.value) return;

        if (!words.length || !meanings.length) { //array가 아닐 때
            words = [words];
            meanings = [meanings];
        } else {
            words = [...words];
            meanings = [...meanings];
        }

        let savedDate = { ...this.state.savedDate };
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

        const index = datesDetail
            .findIndex(date => date.id === savedDate.id);
        
        datesDetail[index] = savedDate;

        axios.post(`/${this.props.userUID}/${this.state.year}/${this.state.month}.json`, updateMonth)
            .then(response => {
                this.setState({
                    datesDetail: datesDetail,
                    savedDate: savedDate,
                    inputBoxes: INPUTBOXES
                });
            })
            .catch(error => console.log(error));

        //input value를 초기화함
        words.forEach((word, index) => {
            meanings[index].value = ''
            word.value = '';
        });
    }



    //+버튼을 눌렀을 때
    addWordHandler = (event) => {

        event.preventDefault();

        const inputBoxes = [...this.state.inputBoxes];
        const addWord = {
            word: '',
            meaning: ''
        };

        //if (this.state.selectedDate.words) {
        //    words = [...this.state.selectedDate.words];
        //}

        inputBoxes.push(addWord);

        this.setState({ inputBoxes: inputBoxes });
    }



    //input 상태의 word box를 삭제할 때
    deleteWordHandler = (word) => {
        const inputBoxes = [...this.state.inputBoxes];

        const deleteWord = inputBoxes.findIndex(item => item === word);

        inputBoxes.splice(deleteWord, 1);

        this.setState({ inputBoxes: inputBoxes });
    }



    // saved된 date에서 word를 삭제할 때 
    deleteSavedWordHandler = (word) => {
        let savedDate = { ...this.state.savedDate };

        const deleteWord = savedDate.words.findIndex(item => item === word);

        savedDate.words.splice(deleteWord, 1);

        this.setState({ savedDate: savedDate });
    }



    //save된 word box에서 마우스가 들어올 때
    wordEnterHandler = (word) => {
        const savedDate = { ...this.state.savedDate };

        const checkHover = savedDate.words.findIndex(item => item === word);

        savedDate.words[checkHover].hovered = true;

        this.setState({ savedDate: savedDate });
    }



    //save된 word box에서 마우스가 나갈때
    wordLeaveHandler = (word) => {
        const savedDate = { ...this.state.savedDate };

        const checkHover = savedDate.words.findIndex(item => item === word);

        savedDate.words[checkHover].hovered = false;

        this.setState({ savedDate: savedDate });
    }



    //오늘 날짜로 이동
    moveToTodayHandler


    render() {

        const selectedMonth = `${this.state.year}-${this.state.month + 1}`;

        const selectedDate = `${this.state.year}-${this.state.month + 1}-${this.state.selectedDate.date}`;

        const today = `${this.state.today.year}-${this.state.today.month + 1}-${this.state.today.date}`;

        const dayOfTheWeek = DAY_OF_THE_WEEK[this.state.selectedDate.dayOfTheWeek];

        let amountOfSavedWords;

        if (this.state.savedDate.words){
            amountOfSavedWords = this.state.savedDate.words.length;
        }

        return (
            <>
                <Modal
                    modalOpened={this.state.modalOpened}
                    cancelModal={this.closeModalHandler}>
                    <WordContainer
                        clickedDate={selectedDate}
                        cancelModal={this.closeModalHandler}
                        dayOfTheWeek={dayOfTheWeek}
                        amountOfSavedWords={amountOfSavedWords}

                        //input 상태의 word box
                        clicked={event => this.addWordHandler(event)}
                        deleteWord={this.deleteWordHandler}
                        words={this.state.inputBoxes}

                        //save된 word box
                        savedWords={this.state.savedDate.words}
                        deleteSavedWord={this.deleteSavedWordHandler}
                        mouseEntered={this.wordEnterHandler}
                        mouseLeaved={this.wordLeaveHandler}

                        //save 버튼
                        submitted={(event) => this.saveHandler(event)} />
                </Modal>
                <Calendar
                    today={today}
                    todayClicked={this.moveToTodayHandler}
                    selectedDate={this.selectDateHandler}
                    nextMonth={this.nextMonthHandler}
                    previousMonth={this.previousMonthHandler}
                    datesDetail={this.state.datesDetail}
                    selectedMonth={selectedMonth} />
            </>
        )
    }

}

export default CalendarControl;
import React, { Component } from "react";
import axios from '../../aixos-wordsDate'
import { connect } from 'react-redux';

import Calendar from '../../component/Calendar/Calendar';
import Modal from '../../component/UI/Modal/Modal';
import WordContainer from '../../component/Calendar/WordsContainer/WordsContainer';

//import {
//    storeDatesDetail
//} from '../../store/user/userActionCreator';
import {
    saveDatesDetail,
    storeDatesDetail,
    loadToday,
    nextMonth,
    prevMonth
} from '../../store/reducers/userReducer';


const INPUTBOXES = [
    {
        word: '',
        meaning: '',
    }
];


class CalendarBuilder extends Component {

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
        activatedDelete: false,
    }


    //처음 render했을 때
    componentDidMount() {
        this.props.loadToday();

        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();

        const lastDay = new Date(year, month + 1, 0);
        const datesDetail = [];
        const dateObejct = {}

        for (let date = 1; date <= lastDay.getDate(); date++) {

            const dayOfTheWeek = new Date(year, month, date);

            dateObejct[date] = {
                date,
                dayOfTheWeek: dayOfTheWeek.getDay(),
                id: date + `${this.props.DAY_OF_THE_WEEK[dayOfTheWeek.getDay()]}`,
                words: []
            }

            datesDetail.push(dateObejct[date]);
        }

        this.props.datesDetailForClient(datesDetail);

        this.setState({
            year,
            month,
            //datesDetail: datesDetail,
            today: {
                year,
                month,
                date: today.getDate(),
            }
        });

        this.props.storeDatesDetail({
            uid: this.props.userData.uid,
            year: year,
            month: month
        });


        //추후 변경
        //axios.get(`/${this.props.userData.uid}/${year}/${month}.json`)
        //    .then(response => {
        //        for (let key in response.data) {
        //            if (response.data[key].year === year && response.data[key].month === month) {
        //                updatedDetail = [...response.data[key].datesDetail];
        //                updatedDetail.forEach(date => {
        //                    if (!date.words) {
        //                        date.words = [];
        //                    }
        //                });

        //                this.setState({ datesDetail: updatedDetail });
        //            }
        //        }
        //    });



    }

    componentDidUpdate(prevProps, prevState) {

        if (prevState.activatedDelete !== this.state.activatedDelete) {

            const savedWords = [...this.state.savedDate.words];
            const updatedWord = savedWords.map(word => {
                return {
                    ...word,
                    checked: false
                };
            });

            return this.setState({
                savedDate: {
                    ...this.state.savedDate,
                    words: updatedWord
                }
            });
        };

        if (prevState.inputBoxes === this.state.inputBoxes) {
            if (document.querySelector('input[name="word"]') || document.querySelector('input[name="meaning"]')) {
                document.querySelector('input[name="word"]').value = '';
                document.querySelector('input[name="meaning"]').value = '';
            }
        }

        if (prevState.year !== this.state.year || prevState.month !== this.state.month) {
            this.props.storeDatesDetail({
                uid: this.props.userData.uid,
                year: this.state.year,
                month: this.state.month
            });
        }
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

        //this.props.nextMonth();

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

        this.props.datesDetailForClient(datesDetail);

        this.setState({
            year: year,
            month: month,
            //datesDetail: datesDetail,
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

        //this.props.prevMonth();

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

        this.props.datesDetailForClient(datesDetail);

        this.setState({
            year: year,
            month: month,
            //datesDetail: datesDetail,
        });
    }




    //오늘로 이동
    moveToTodayHandler = () => {

        const today = { ...this.state.today };

        this.setState({
            year: today.year,
            month: today.month
        });
    }




    //특정 date를 클릭했을 때 
    selectDateHandler = (inputDate) => {
        const date = [...this.props.datesDetail]
            .find(date => date === inputDate);

        this.setState({ 
            modalOpened: true, 
            selectedDate: date, 
            savedDate: date, 
            deleteContainer: date 
        });
    }



    //backdrop이나 modal을 닫을 때
    closeModalHandler = () => {
        this.setState({
            modalOpened: false,
            inputBoxes: INPUTBOXES,
            activatedDelete: false,
        });
    }



    //save버튼을 눌렀을 때
    saveHandler = (event) => {
        event.preventDefault();

        const datesDetail = [...this.props.datesDetail];

        const updateMonth = { datesDetail };

        let words = event.target.word;
        let meanings = event.target.meaning;

        if (words === undefined || meanings === undefined) return;

        if ((words.length <= 1 && !words.value) || (meanings.length <=1 && !meanings.value)) return;

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
            obj.checked = false;
            obj.correct = false;

            container.push(obj);
        })

        savedDate.words = [...savedDate.words, ...container];

        const index = datesDetail
            .findIndex(date => date.id === savedDate.id);

        datesDetail[index] = savedDate;

        axios.post(`/${this.props.userData.uid}/${this.state.year}/${this.state.month}.json`, updateMonth)
            .then(response => {

                this.props.datesDetailForClient(datesDetail);

                this.setState({
                    //datesDetail: datesDetail,
                    savedDate: savedDate,
                    inputBoxes: INPUTBOXES
                });
            })
            .catch(error => console.log(error));

    }


    multipleDeleteHandler = () => {
        const savedDate = { ...this.state.savedDate };
        const datesDetail = [...this.props.datesDetail];

        const updatedWords = savedDate.words.filter(word => !word.checked);

        const updatedDetail = datesDetail.map(date => {
            if (date.id === savedDate.id) {
                return date = {
                    ...date,
                    words: updatedWords
                }
            }

            return date;
        });

        axios.post(`/${this.props.userData.uid}/${this.state.year}/${this.state.month}.json`, { datesDetail: updatedDetail })
            .then(response => {

                this.props.datesDetailForClient(updatedDetail);

                this.setState({
                    savedDate: {
                        ...this.state.savedDate,
                        words: updatedWords
                    }
                });
            })
            .catch(error => console.log(error));

    }



    //+버튼을 눌렀을 때
    addWordHandler = (event) => {

        event.preventDefault();

        const inputBoxes = [...this.state.inputBoxes];
        const addWord = {
            word: '',
            meaning: ''
        };

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
        const datesDetail = [...this.props.datesDetail];
        const index = datesDetail.findIndex(date => date.id === savedDate.id);
        const deleteWord = savedDate.words.find(item => item === word);
        const words = savedDate.words.filter(words => words !== deleteWord);

        datesDetail[index] = { ...datesDetail[index], words };

        savedDate = { ...savedDate, words };

        axios.post(`/${this.props.userData.uid}/${this.state.year}/${this.state.month}.json`, {
            datesDetail: datesDetail
        })
            .then(response => {
                this.props.datesDetailForClient(datesDetail);

                this.setState({
                    savedDate
                });
            })
            .catch(error => console.log(error));
    }


    activeMultipleDeleteHandler = () => {
        this.setState({ activatedDelete: true, inputBoxes:[]});
    }


    cancelMultipleDeleteHandler = () => {
        const inputBoxes = [...this.state.inputBoxes, INPUTBOXES];

        this.setState({ activatedDelete: false, inputBoxes: inputBoxes });
    }


    selectMultipleHandler = (word) => {

        if (!this.state.activatedDelete) return;

        const savedDate = { ...this.state.savedDate };
        const selectedWord = savedDate.words.find(item => word === item);
        const updatedWord = savedDate.words.map(word => {
            if (word === selectedWord) {
                return {
                    ...word,
                    checked: !word.checked
                };
            }

            return word;
        })

        this.setState(prevState => {
            return {
                savedDate: {
                    ...prevState.savedDate,
                    words: updatedWord
                },
            }
        });
    }


    render() {

        const selectedMonth = `${this.state.year}-${this.state.month + 1}`;
        const selectedDate = `${this.state.month + 1}-${this.state.selectedDate.date}`;
        const today = `${this.state.today.year}-${this.state.today.month + 1}-${this.state.today.date}`;
        const dayOfTheWeek = this.props.DAY_OF_THE_WEEK[this.state.selectedDate.dayOfTheWeek];
        let amountOfSavedWords;

        if (this.state.savedDate.words) {
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

                        //save 버튼
                        submitted={(event) => this.saveHandler(event)}

                        //delete 버튼
                        activateDelete={this.state.activatedDelete}
                        multipleDeleteClicked={this.activeMultipleDeleteHandler}
                        multipleDeleteCanceled={this.cancelMultipleDeleteHandler}
                        selectMultiple={this.selectMultipleHandler}
                        deleteConfirmed={this.multipleDeleteHandler} />
                </Modal>
                <Calendar
                    today={today}
                    selectedDate={this.selectDateHandler}
                    nextMonth={this.nextMonthHandler}
                    previousMonth={this.previousMonthHandler}
                    datesDetail={this.props.datesDetail}
                    selectedMonth={selectedMonth}
                    todayClicked={this.moveToTodayHandler} />
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        userData: state.user.userData,
        datesDetail: state.user.datesDetail,
        today: state.user.today,
        dateForChange: state.user.dateForChange,

        DAY_OF_THE_WEEK: state.ui.DAY_OF_THE_WEEK
    }
}

const mapDispatchToProps = dispatch => {
    return {
        storeDatesDetail: (obj) => dispatch(saveDatesDetail(obj)),
        datesDetailForClient: (datesDetail) => dispatch(storeDatesDetail(datesDetail)),
        loadToday: () => dispatch(loadToday()),
        nextMonth: () => dispatch(nextMonth()),
        prevMonth: () => dispatch(prevMonth())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarBuilder);
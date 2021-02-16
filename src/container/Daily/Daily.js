import React from 'react';
import { connect } from 'react-redux';

import ShowResult from '../../component/Quiz/ShowResult/ShowResult';
import DailyQuiz from '../../component/Quiz/DailyQuiz/DailyQuiz';

class Daily extends React.Component {
    state = {
        randomWord: {},
        leftWords: [],
        datesDetailForUpdate: [],
        selectedDate: {},
        wrongAnswer: false,
        answerHistory: [],
        showResult: false,
    }

    // this.props.datesDetail = [{date, id, words: {word, meaning, checked, correct}}]

    //this.props.selectedDate = {words, id, date, dayOfTheWeek}

    //answerHistory: [{id: ######, meaning: '######'}]

    componentDidMount() {
        const selectedDate = { ...this.props.selectedDate }

        const index = Math.floor(Math.random() * (selectedDate.words.length));

        const leftWords = this.props.selectedDate.words.filter((word, wordIndex) => index !== wordIndex);

        const randomWord = { ...selectedDate.words[index], correct: false }

        this.setState({ 
            randomWord, 
            leftWords, 
            datesDetailForUpdate: this.props.datesDetail,
            selectedDate: this.props.selectedDate
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (document.querySelector(`input[name='answer']`)) {
            document.querySelector(`input[name='answer']`).focus();
        }

        if (prevState.randomWord !== this.state.randomWord) {
            if (document.querySelector(`input[name='answer']`)){
                document.querySelector(`input[name='answer']`).value = '';
            }
            return this.setState({ wrongAnswer: false });
        }
    }

    answerSubmitHandler = (event) => {
        event.preventDefault();

        const selectedDate = { ...this.state.selectedDate }
        const userAnswer = event.target.answer.value;
        const leftWords = [...this.state.leftWords];
        const index = Math.floor(Math.random() * (leftWords.length));
        const updatedLeftWords = leftWords.filter((word, wordIndex) => index !== wordIndex);
        let randomWord;
        let answerHistory;

        if (!leftWords[index]) {
            randomWord = {}
        } else {
            randomWord = {...leftWords[index]}
        }

        if (userAnswer === this.state.randomWord.meaning) {
            const updatedDate = selectedDate.words.map(word => {
                if (word.id === this.state.randomWord.id) {
                    
                    answerHistory = [...this.state.answerHistory, {id: word.id, meaning: userAnswer}];

                    return word = {
                        ...word,
                        correct: true
                    }
                }
                return word;
            });

            this.setState({
                selectedDate: {
                    ...this.state.selectedDate,
                    words: updatedDate
                },
                randomWord,
                leftWords: updatedLeftWords,
                answerHistory
            });

        } else {

            selectedDate.words.forEach(word => {
                if (word.id === this.state.randomWord.id) {
                    answerHistory = [...this.state.answerHistory, {id: word.id, meaning: userAnswer}];
                }
            })

            this.setState({ wrongAnswer: true, answerHistory });
        }
    }

    nextQuestionHandler = () => {
        const selectedDate = { ...this.state.selectedDate }
        const leftWords = [...this.state.leftWords];
        const index = Math.floor(Math.random() * (leftWords.length));
        const updatedLeftWords = leftWords.filter((word, wordIndex) => index !== wordIndex);
        let randomWord;
        let answerHistory;

        if (!leftWords[index]) {
            randomWord = {}
        } else {
            randomWord = {...leftWords[index]}
        }

        selectedDate.words.forEach(word => {
            if (word.id === this.state.randomWord.id) {
                answerHistory = [...this.state.answerHistory, { id: word.id, meaning: 'Passed' }];
            }
        });

        this.setState({ 
            selectedDate,
            randomWord,
            leftWords: updatedLeftWords,
            answerHistory
        });
    }

    retryHandler = () => {
        const selectedDate = { ...this.props.selectedDate }
        const index = Math.floor(Math.random() * (selectedDate.words.length));
        const leftWords = this.props.selectedDate.words.filter((word, wordIndex) => index !== wordIndex);
        const randomWord = { ...selectedDate.words[index], correct: false }

        this.setState({ randomWord, leftWords, selectedDate, answerHistory: [] });
    }

    cancelHandler = () => {
        this.props.history.goBack();
    }

    showResultHandler = () => {
        this.setState({ showResult: true });
    }

    closeResultHandler = () => {
        this.setState({ showResult: false });
    }    
 
    render() {
        let correct = 0;
        let amountOfWords = 0;
        let currentOrder = 0;
        let maxOrder = 0
        const wrongAnswer = this.state.wrongAnswer ? 'active' : '';

        if (this.state.leftWords && this.state.selectedDate.words) {
            currentOrder = this.state.selectedDate.words.length - this.state.leftWords.length;

            maxOrder = this.state.selectedDate.words.length;
        }

        if (this.state.selectedDate.words){
            amountOfWords = this.state.selectedDate.words.length;
            this.state.selectedDate.words.forEach(word => word.correct ? correct++ : null);
        }

        return (
            <>
                <ShowResult 
                    answerHistory={this.state.answerHistory}
                    selectedDate={this.state.selectedDate.words}
                    showResult={this.state.showResult}
                    maxOrder={maxOrder}
                    correct={correct}

                    closeResult={this.closeResultHandler} />
                <DailyQuiz 
                    randomWord={this.state.randomWord}
                    correct={correct}
                    amountOfWords={amountOfWords}
                    currentOrder={currentOrder}
                    wrongAnswer={wrongAnswer}
                    maxOrder={maxOrder}
                    
                    //handler
                    cancelClicked={this.cancelHandler}
                    retryClicked={this.retryHandler}
                    answerSubmitted={this.answerSubmitHandler}
                    nextQuestionClicked={this.nextQuestionHandler}
                    showResultClicked={this.showResultHandler} />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectedDate: state.user.selectedDate,
        datesDetail: state.user.datesDetail,
    }
}

export default connect(mapStateToProps)(Daily)
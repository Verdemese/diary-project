import React from 'react';
import { connect } from 'react-redux';

import ShowResult from '../../component/Quiz/ShowResult/ShowResult';
import DailyQuiz from '../../component/Quiz/DailyQuiz/DailyQuiz';

class Monthly extends React.Component {
    state = {
        randomWord: {},
        leftWords: [],
        datesDetailForUpdate: [],
        originalRandomWords: [],
        wrongAnswer: false,
        answerHistory: [],
        showResult: false,
    }

    componentDidMount() {
        const selectedMonth =  [...this.props.datesDetail];
        let monthWords = []; // all words in month

        selectedMonth.forEach(date => {
            const identifiedWords = date.words.map(word => { 
                    return word = {
                        ...word,
                        dateID: date.id
                    }
                });

            monthWords = [...monthWords, ...identifiedWords];
        });

        for (let i=monthWords.length-1; i>=20; i--) {
            const index = Math.floor(Math.random() * (monthWords.length));
            monthWords.splice(index, 1);
        }

        const originalRandomWords = [...monthWords];
        
        const index = Math.floor(Math.random() * (originalRandomWords.length));
        const leftWords = originalRandomWords.filter((word, wordIndex) => index !== wordIndex);
        const randomWord = { ...originalRandomWords[index], correct: false }

        this.setState({ 
            originalRandomWords,
            randomWord, 
            leftWords, 
            datesDetailForUpdate: this.props.datesDetail,
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

        const originalRandomWords = [...this.state.originalRandomWords];
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
            const updatedWords = originalRandomWords.map(word => {
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
                originalRandomWords: updatedWords,
                randomWord,
                leftWords: updatedLeftWords,
                answerHistory
            });

        } else {
            originalRandomWords.forEach(word => {
                if (word.id === this.state.randomWord.id) {
                    answerHistory = [...this.state.answerHistory, {id: word.id, meaning: userAnswer}];
                }
            })

            this.setState({ wrongAnswer: true, answerHistory });
        }
    }

    nextQuestionHandler = () => {
        const originalRandomWords = [...this.state.originalRandomWords];
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

        originalRandomWords.forEach(word => {
            if (word.id === this.state.randomWord.id) {
                answerHistory = [...this.state.answerHistory, { id: word.id, meaning: 'Passed' }];
            }
        });

        this.setState({ 
            originalRandomWords,
            randomWord,
            leftWords: updatedLeftWords,
            answerHistory
        });
    }

    retryHandler = () => {
        const originalRandomWords = [...this.state.originalRandomWords];

        const resetWords = originalRandomWords.map(word => {
            return word = {
                ...word,
                correct: false
            }
        });

        const index = Math.floor(Math.random() * (originalRandomWords.length));
        const leftWords = originalRandomWords.filter((word, wordIndex) => index !== wordIndex);
        const randomWord = { ...originalRandomWords[index], correct: false }

        this.setState({ randomWord, leftWords, originalRandomWords: resetWords, answerHistory: [] });
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

        if (this.state.leftWords && this.state.originalRandomWords) {
            currentOrder = this.state.originalRandomWords.length - this.state.leftWords.length;

            maxOrder = this.state.originalRandomWords.length;
        }

        if (this.state.originalRandomWords){
            amountOfWords = this.state.originalRandomWords.length;
            this.state.originalRandomWords.forEach(word => word.correct ? correct++ : null);
        }

        return (
            <>
                <ShowResult 
                    answerHistory={this.state.answerHistory}
                    selectedDate={this.state.originalRandomWords}
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
        datesDetail: state.user.datesDetail,
    }
}

export default connect(mapStateToProps)(Monthly)
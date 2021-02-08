import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Button from '../../component/UI/Button/Button';
import ShowResult from '../../component/Quiz/ShowResult/ShowResult';
import DailyQuiz from '../../component/Quiz/DailyQuiz/DailyQuiz';

const StyledQuiz = styled.form`
    position: relative;
    display: block;
    width: 30rem;
    background-color: white;
    max-height: auto;
    padding: 10%;
    margin: auto;
    border-radius: 10px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);

    & > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: auto;
    }

    & span {
        position: absolute;
        border-radius: 5px;
        right: 3%;
        top: 3%;
        padding: 1%;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    }

    & .quizButton_container {
        width: 70%;
        text-align: center;
    }

    @media (max-width: 599px) {
        display: block;
        width: 100%;
        background-color: white;
        max-height: auto;
        margin: auto;
        border-radius: 0; 
    }

`

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

        let showQuiz;
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
                    selectedDate={this.state.selectedDate}
                    showResult={this.state.showResult}
                    closeResult={this.closeResultHandler} 
                    maxOrder={maxOrder}
                    correct={correct} />
                <StyledQuiz onSubmit={this.answerSubmitHandler}>
                    <div>
                        <h3>Daily</h3>
                        <DailyQuiz 
                            randomWord={this.state.randomWord}
                            correct={correct}
                            amountOfWords={amountOfWords}
                            currentOrder={currentOrder}
                            maxOrder={maxOrder}
                            wrongAnswer={wrongAnswer}
                            nextQuestionClicked={this.nextQuestionHandler} 
                            showResultClicked={this.showResultHandler} />
                        <div className='quizButton_container'>
                            <button type='button' onClick={this.retryHandler}>retry</button>
                            <Button
                                buttonType='button'
                                funcType='cancel'
                                clicked={this.cancelHandler}>cancel</Button>
                        </div>
                    </div>
                </StyledQuiz>
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
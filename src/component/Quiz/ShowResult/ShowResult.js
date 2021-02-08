import { Result } from 'antd';
import React from 'react';
import styled from 'styled-components';

import Modal from '../../UI/Modal/Modal';
import ResultItem from './ResultItem/ResultItem';
import CloseButton from '../../UI/Button/CloseButton';

const StyledResult = styled.div`
    padding: 10%;
    text-align: center;
    overflow: auto;
    max-height: 100%;

    & .result_category {
        font-size: 0.7rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 0;
        border-bottom: 1px solid #ccc;
        border-radius: 5px;
    }

    & .result_category span {
        width: 100%;
        text-align: center;
        display: inline-block;
        margin: auto;
    }

    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: rgba(0, 0, 0, 0.5);
    }

    &::-webkit-scrollbar-track {
        background-color: transparent;
    }

    &::-webkit-scrollbar-button {
        width: 0;
        height: 0;
    }

`

const showResult = (props) => {

    let result;
    const percentage = Math.round((props.correct/props.maxOrder) * 100);

    if (Object.keys(props.selectedDate).length > 0) {
        const correctAnswers = props.selectedDate.words;
        const answerHistory = props.answerHistory;

        result = answerHistory.map(answer => {
            const resultItem = correctAnswers.find(word => word.id === answer.id);

            return <ResultItem
                correct={resultItem.correct}
                correctAnswer={resultItem}
                userAnswer={answer} />
        });
    } 

    return (
        <>
            <Modal 
                modalOpened={props.showResult}
                cancelModal={props.closeResult}>
                <CloseButton closeClicked={props.closeResult}/>
                <StyledResult>
                    <h3>Result: {percentage}%</h3>
                    <div className='result_category'>
                        <span>Word</span>
                        <span>Mean</span>
                        <span>Answer</span>
                    </div>
                    <ol>
                        {result}
                    </ol>
                </StyledResult>
            </Modal>
        </>
    );
}

export default showResult;
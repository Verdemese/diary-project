import React from 'react';
import styled from 'styled-components';

import AddWord from './Word/AddWord';
import AddedWord from './Word/AddedWord';
import plus from '../../../assets/plus-symbol.png';

const StyledWordsContainer = styled.form`
    width: 100%;
    left: 0;
    height: 100%;
    border-radius: 20px;
    margin: auto;
    font-size: 1rem;
    overflow: auto;
    background-color: white;
    padding-bottom: 4rem;

    & .day__info {
        margin: auto;
        width: 80%;
        padding-bottom: 0.5rem;
        border-bottom: solid #ccc 1px;
    }

    & .day__info p {
        padding: 0 1rem;
    }

    & .day__info h1, h3, h4 {
        margin: 0.7rem auto;
    }

    & .button__container {
        width: inherit;
        height: 4rem;
        position: fixed;
        border-radius: 10px;
        background-color: white;
        bottom: 0;
        text-align: center;
        display: flex;
        justify-content: center;
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

const ButtonContainer = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    transform: translateY(50%);
    width: 100%;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;

    & button {
        width: 4rem;
        height: 4rem;
        margin: 0 1rem;
        border-radius: 50%;
        border-color: transparent;
    }

    & button.save, button.plus {
        background: #009B77;
        color: white;
    }
    
    & button:hover {
        background: rgba(25,122,115);
    }
`


const wordsContainer = props => {
    
    let addWord;

    if (props.words) {
        addWord = props.words
            .map((word, index) => {
                return <AddWord
                        clicked={() => props.deleteWord(word)}
                        key={index} />;
            });
    }

    let savedWords;

    if (props.savedWords) {
        savedWords = props.savedWords
            .map((word, index) => {

                if (word.word && word.meaning) {
                    return <AddedWord
                            //mouse hover 이벤트
                            mouseEntered={() => props.mouseEntered(word)}
                            mouseLeaved={() => props.mouseLeaved(word)}
                            checkHover={word.hovered}

                            //saved word box
                            clicked={() => props.deleteSavedWord(word)}
                            word={word.word}
                            meaning={word.meaning}
                            key={index} />;
                } 
            });
    }

    //추후 정리

    return (
        <StyledWordsContainer
            onSubmit={props.submitted}>
            <div className='day__info'>
                <h1>{props.clickedDate}</h1>
                <h3>{props.dayOfTheWeek}</h3>
                <h4>amount: {props.amountOfSavedWords}</h4>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                padding: '0 10%',
                margin: '0'
            }}>
                <div style={{
                    width: '100%',
                    marginTop: '10px',
                }}>
                    {savedWords}
                    {addWord}
                </div>
            </div>
            <ButtonContainer>
                <button className='save' type='submit'>save</button>
                <button className='plus' type='click' onClick={props.clicked}>
                    <img style={{
                        width: '50%',
                        background: 'transparent',
                    }} src={plus} alt='+' />
                </button>
            </ButtonContainer> 
        </StyledWordsContainer>
    );
}

export default wordsContainer;
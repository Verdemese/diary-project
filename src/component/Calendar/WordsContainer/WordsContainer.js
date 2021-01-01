import React from 'react';
import styled from 'styled-components';

import AddWord from './Word/AddWord';
import AddedWord from './Word/AddedWord';
import Button from '../../UI/Button/Button';

const StyledWordsContainer = styled.form`
    width: 100%;
    left: 0;
    height: 100%;
    margin: auto;
    font-size: 1rem;
    overflow: auto;
    background-color: white;
    padding-bottom: 4rem;

    & > p {
        padding: 0 1rem;
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

const StyledButtonContainer = styled.div`
    width: inherit;
    height: 4rem;
    position: fixed;
    border-radius: 10px;
    background-color: white;
    bottom: 0;
    text-align: center;
    display: flex;
    justify-content: center;
`

const StyledAddButton = styled.button`
background-color: rgba(128,128,128, 0.3);
border: none;
border-radius: 10px;
width: 10%;
height: 50%;
position: fixed;
right: 1rem;
transform: translateY(-50%);
top: 50%;
cursor: pointer;
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
            <p>{props.clickedDate}</p>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '90%',
                padding: '0 1.5rem'
            }}>
                <div style={{
                    width: '100%'
                }}>
                    {savedWords}
                    {addWord}
                </div>
                <StyledAddButton onClick={props.clicked} type='button'>+</StyledAddButton>
            </div>
            <StyledButtonContainer>
                <Button buttonType='submit'>save</Button>
                <Button buttonType='click' clicked={props.cancelModal}>close</Button>
            </StyledButtonContainer>
        </StyledWordsContainer>
    );
}

export default wordsContainer;
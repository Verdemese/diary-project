import React from 'react';
import styled from 'styled-components';

import AddWord from './Word/AddWord';
import AddedWord from './Word/AddedWord';
import Button from '../../UI/Button/Button';

const StyledWordsContainer = styled.form`
    width: 90%;
    left: 0;
    height: 100%;
    margin: auto;
    font-size: 1rem;
    overflow: auto;
    background-color: white;
    padding-bottom: 4rem;

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
    background-color: white;
    bottom: 0;
    text-align: center;
    display: flex;
    justify-content: center;
`

const wordsContainer = props => {
    
    let addWord;

    if (props.words) {
        addWord = props.words
            .map((word, index) => {
                return (
                    <AddWord
                        clicked={() => props.deleteWord(word)}
                        key={index} />
                );
            });
    }

    let savedWords;

    if (props.savedWords) {
        savedWords = props.savedWords
            .map((word, index) => {

                if (word.word && word.meaning) {
                    return (
                        <AddedWord
                            //mouse hover 이벤트
                            mouseEntered={() => props.mouseEntered(word)}
                            mouseLeaved={() => props.mouseLeaved(word)}
                            checkHover={word.hovered}

                            //saved word box
                            clicked={() => props.deleteSavedWord(word)}
                            word={word.word}
                            meaning={word.meaning}
                            key={index} />
                    );
                } 
            });
    }


    return (
        <StyledWordsContainer
            onSubmit={props.submitted}>
            <p>{props.clickedDate}</p>
            {savedWords}
            {addWord}
            <StyledButtonContainer>
                <Button clicked={props.clicked} buttonType='button'>+</Button>
                <Button buttonType='submit'>save</Button>
            </StyledButtonContainer>
        </StyledWordsContainer>
    );
}

export default wordsContainer;
import React from 'react';
import styled from 'styled-components';

import AddWord from './Word/AddWord';
import AddedWord from './Word/AddedWord';
import plus from '../../../assets/plus-symbol.png';

import closeIcon from '../../../assets/test.png';
import clickedCloseIcon from '../../../assets/close-icon-clicked.png';
import checkIcon from '../../../assets/check-icon.png';
import clickedCheckIcon from '../../../assets/check-icon-clicked.png';
import plusIcon from '../../../assets/plus-icon.png';
import clickedPlusIcon from '../../../assets/plus-icon-clicked.png';
import binIcon from '../../../assets/bin-icon.svg';

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
        position: relative;
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
        text-transform: capitalize;
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

    & .close {
        position: fixed;
        background: no-repeat center/100% url(${closeIcon});
        width: 2rem;
        aspect-ratio: 1;
        right: 5%;
        top: 5%;
    }

    & .close:active, & .close:hover {
        position: fixed;
        background: no-repeat center/100% url(${clickedCloseIcon});
        width: 2rem;
        aspect-ratio: 1;
        right: 5%;
        top: 5%;
    }

    & .edit {
        position: absolute;
        right: 5%;
        bottom: 5%;
    }


    & .edit.disable .delete {
        display: none;
    }

    & .edit.disable .cancel {
        display: block;
    }

    & .edit .cancel {
        display: none;
    }

    & .edit .delete {
        display: block;
    }


    //scroll

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

    @media (max-width: 599px) {
        & .day__info h1, h3, h4 {
            margin: 0.2rem auto;
        }
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
        aspect-ratio: 1;
        margin: 0 1rem;
        border-radius: 50%;
        border-color: transparent;
    }

    &.disable .plus, &.disable .save {
        display: none;
    }

    & .plus {
        background: white no-repeat center/100% url(${plusIcon});
    }

    & .plus:hover {
        background: white no-repeat center/100% url(${clickedPlusIcon});
    }

    & .save {
        background: white no-repeat center/100% url(${checkIcon});
    }

    & .save:hover {
        background: white no-repeat center/100% url(${clickedCheckIcon});
    }
    
    & .delete {
        display: none;
    }

    &.disable .delete {
        display: block;
    }


    @media (max-width: 599px) {
        & button {
            width: 3.4rem;
        }
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

                if (word.word && word.meaning ) {
                    return <AddedWord
                        activatedDelete={props.activateDelete}
                        checked={word.checked}
                        //saved word box
                        
                        id={word.id + index}
                        clicked={() => props.deleteSavedWord(word)}
                        checkboxClicked={() => props.selectMultiple(word)}
                        word={word.word}
                        meaning={word.meaning}
                        key={index} />;
                }
            });
    }

    //추후 정리

    let disable = props.activateDelete ? 'disable' : null ;

    return (
        <StyledWordsContainer
            onSubmit={props.submitted}>
            <div className='day__info'>
                <h1>{props.clickedDate}</h1>
                <h3>{props.dayOfTheWeek}</h3>
                <h4>amount: {props.amountOfSavedWords}</h4>
                <div className={'edit ' + disable}>
                    <button 
                        type='button'
                        className={'delete'}
                        onClick={props.multipleDeleteClicked}>delete</button>
                    <button 
                        type='button'
                        className={'cancel'}
                        onClick={props.multipleDeleteCanceled}>cancel</button>
                </div>
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
            <ButtonContainer className={disable}>
                <button className='save' type='submit'></button>
                <button className='plus' type='button' onClick={props.clicked}>
                </button>
                <button 
                    className='save delete' 
                    type='button' 
                    onClick={props.deleteConfirmed}>
                </button>
            </ButtonContainer>
            <button className='close' type='button' onClick={props.cancelModal} />
        </StyledWordsContainer>
    );
}

export default wordsContainer;
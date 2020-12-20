import React from 'react';
import styled from 'styled-components';

import AddWord from './Word/AddWord';
import AddedWord from './Word/AddedWord';

const StyledWordsContainer = styled.form`
    width: 100%;
    left: 0;
    height: 100%;
    overflow: auto;
    background-color: white;
`

const StyledButtonContainer = styled.div`
    width: 100%;    
    position: fixed;
    bottom: 0;
    text-align: center;
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
            //[undefined, undefined, undefined]
            .map((word, index) => {

                if (!word.word && !word.meaning) return; 

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
            });
    }

    //if (props.words) {
    //    amountInputs = [...Array(props.words.length)]
    //        //[undefined, undefined, undefined]
    //        .map((__, index) => {
    //            return <Word clicked={props.deleteWord} key={index}/>
    //        });
    //}

    return (
        <StyledWordsContainer
            onSubmit={props.submitted}>
            {savedWords}
            {addWord}
            <StyledButtonContainer>
                <button onClick={props.clicked} type='button'>+</button>
                <button type='submit'>save</button>
            </StyledButtonContainer>
        </StyledWordsContainer>
    );
}

export default wordsContainer;
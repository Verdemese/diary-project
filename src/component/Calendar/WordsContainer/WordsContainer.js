import React from 'react';
import styled from 'styled-components';
import Word from './Word/Word';

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
    
    let amountInputs;

    if (props.words) {
        amountInputs = props.words
            //[undefined, undefined, undefined]
            .map((word, index) => {
                return <Word clicked={() => props.deleteWord(word)} key={index}/>
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
            {amountInputs}
            <StyledButtonContainer>
                <button onClick={props.clicked} type='button'>+</button>
                <button type='submit'>save</button>
            </StyledButtonContainer>
        </StyledWordsContainer>
    );
}

export default wordsContainer;
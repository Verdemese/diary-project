import React from 'react';
import styled from 'styled-components';
import Word from './Word/Word';

const StyledWordsContainer = styled.div`
    width: 100%;
    left: 0;
    height: 100%;
    overflow: auto;
    background-color: white;
`

const wordsContainer = props => {
    return (
        <StyledWordsContainer>
           <Word /> 
           <Word /> 
           <Word /> 
           <Word /> 
        </StyledWordsContainer>
    );
}

export default wordsContainer;
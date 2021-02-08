import React from 'react';
import styled from 'styled-components';

import Backdrop from '../Backdrop/Backdrop';
import closeIcon from '../../../assets/test.png';
import clickedCloseIcon from '../../../assets/close-icon-clicked.png';
import checkIcon from '../../../assets/check-icon.png';
import clickedCheckIcon from '../../../assets/check-icon-clicked.png';


const Modal = styled.div`
    visibility: hidden;
    position: fixed;
    z-index: 500;
    width: 27rem;
    left: 50%;
    top: 10%;
    border-radius: 5px;
    transform: translateX(-50%);
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.4);
    margin: auto;
    background-color: white;
    opacity: 0;
    transition: opacity 0.3s ease-out;

    &.opened {
        visibility: visible;
        opacity: 1;
    }

    //for quiz

    &.quiz {
        visibility: hidden;
        position: absolute;
        z-index: 500;
        left: 50%;
        width: 27rem;
        height: auto;
        top: 10%;
        border-radius: 5px;
        transform: translateX(-50%);
        box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.4);
        margin: auto;
        opacity: 0;
        transition: opacity 0.3s ease-out;
        background: transparent;
    }

    &.quiz.opened {
        visibility: visible;
        opacity: 1;
    }

    &.quiz .close {
        display: none;
    }

    &.quiz .check {
        width: 2rem;
        aspect-ratio: 1;
        background: no-repeat center/100% url(${checkIcon});
        display: block;
        margin: auto;
    }

    &.quiz .check:active, &.quiz .check:hover {
        background: no-repeat center/100% url(${clickedCheckIcon});
    }

    @media (max-width: 599px) {
        height: 85%;
        top: 5%;
        width: 95%;

        //for quiz

        &.quiz {
            width: 100%;
            top: 0;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
        }

        &.quiz > button {
            width: 1.3rem;
            aspect-ratio: 1;
        }

        &.quiz .close {
            position: fixed;
            background: no-repeat center/100% url(${closeIcon});
            top: 2%;
            right: 5%;
            display: block;
        }
    
        &.quiz .close:active, &.quiz .close:hover {
            background: no-repeat center/100% url(${clickedCloseIcon});
        }
    }
`

const modal = props => {

    const classForQuiz = props.classForQuiz ? props.classForQuiz : '';

    return (
        <>
            <Backdrop
                opened={props.modalOpened}
                clicked={props.cancelModal} />
            <Modal className={`${classForQuiz} ${props.modalOpened ? 'opened' : ''}`}>
                {props.children}
            </Modal>
        </>
    )
}

export default React.memo(modal);
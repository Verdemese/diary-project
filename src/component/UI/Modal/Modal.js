import React from 'react';
import styled from 'styled-components';

import Backdrop from '../Backdrop/Backdrop';

const Modal = styled.div`
    visibility: hidden;
    position: fixed;
    z-index: 500;
    left: 50%;
    top: 20%;
    border-radius: 5px;
    transform: translateX(-50%);
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.4);
    width: 27rem;
    height: 30rem;
    margin: auto;
    max-height: 30rem;
    background-color: white;
    opacity: 0;
    transition: opacity 0.3s ease-out;

    &.opened {
        visibility: visible;
        opacity: 1;
    }

    @media (max-width: 599px) {
        height: 85%;
        top: 5%;
        width: 95%;
    }

`

const modal = props => {
    return (
        <>
            <Backdrop
                opened={props.modalOpened}
                clicked={props.cancelModal} />
            <Modal className={props.modalOpened ? 'opened' : null}>
                {props.children}
            </Modal>
            {/*<button
                onClick={props.cancelModal}
                type='button'
                style={{
                    backgroundColor: 'black',
                    color: 'white',
                    opacity: '0.3',
                    borderRadius: '50px',
                }}>X</button>*/}
        </>
    )
}

export default React.memo(modal);
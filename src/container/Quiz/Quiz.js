import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import CalendarBuilder from '../CalendarBuilder/CalendarBuilder';
import Modal from '../../component/UI/Modal/Modal';
import Calendar from '../../component/Calendar/Calendar'
import ChangeDate from '../../component/Calendar/ChangeDate/ChangeDate';
import TheDayOfTheWeek from '../../component/Calendar/TheDayOfTheWeek/TheDayOfTheWeek'

const StyledQuiz = styled.div`
    display: block;
    width: 33rem;
    background-color: white;
    height: 26rem;
    margin: 2rem auto;
    border-radius: 10px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);

    @media (max-width: 599px) {
        display: block;
        width: 100%;
        background-color: white;
        height: 20rem;
        margin: auto;
        border-radius: 0;
    }

`
const Quiz = props => {

    const [modalOpened, setModalOpened] = useState(false);

    console.log(props);

    return (
        <>
            <Modal 
                modalOpened={modalOpened}
                cancelModal={() => setModalOpened(false)}>
                
            </Modal>
            <StyledQuiz>
                <div>
                    <button type='button' onClick={() => setModalOpened(true)}>daily</button>
                    <button type='button'>monthly</button>
                </div>
            </StyledQuiz>
        </>
    )
}

const mapStateToProps = state => {
    return {
        datesDetail: state.user.datesDetail
    }
}

export default connect(mapStateToProps)(Quiz);
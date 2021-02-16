import React from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';

const StyledDaysContainer = styled.div`
    margin: auto;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    background-color: white;
    border-bottom: 2px solid #34568B;
    
    & span {
        text-transform: capitalize;
    }

    & span:first-child {
        color: red;
    }

    & span:last-child {
        color: grey;
    }

    @media (max-width: 599px) {
        font-size: 0.8rem;
    }
`

const theDayOfTheWeek = props => {
    const days = props.DAY_OF_THE_WEEK.map(day => {
        return <span key={day}>{day}</span>
    })

    return (
        <StyledDaysContainer>
            {days}
        </StyledDaysContainer>
    )
}

const mapStateToProps = state => {
    return {
        DAY_OF_THE_WEEK: state.ui.DAY_OF_THE_WEEK
    }
}

export default connect(mapStateToProps)(theDayOfTheWeek);
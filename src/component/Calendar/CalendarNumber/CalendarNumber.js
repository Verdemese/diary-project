import React from 'react';
import styled from 'styled-components';

const StyledSpan = styled.span`
    vertical-align: baseline;
    text-align: left;
    padding: 5px;
    height: 4.8rem;

    &:first-child {
        grid-column: ${props=> props.firstDay}
    }

    &.active ,&:hover {
        background-color: rgba(50, 168, 107, 0.4);
        color: white;
    }
`

const calendarNumber = props => {

    return (
        <StyledSpan 
            className={props.active ? 'active' : null}
            onClick={props.clicked}
            firstDay={props.dayOfTheWeek}>{props.children}</StyledSpan>
    );
}

export default calendarNumber;

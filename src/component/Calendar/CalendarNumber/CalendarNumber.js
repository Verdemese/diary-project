import React from 'react';
import styled from 'styled-components';

const StyledSpan = styled.span`
    vertical-align: baseline;
    text-align: left;
    padding: 0.5rem;
    height: 4.8rem;
    cursor: pointer;

    &:first-child {
        grid-column: ${props=> props.firstDay}
    }

    &.active ,&:hover {
        background-color: rgba(50, 168, 107, 0.4);
        color: white;
    }
`

const calendarNumber = props => {

    const id = props.id;

    return (
        <StyledSpan 
            className={props.active ? 'active' : null}
            onClick={() => props.clicked(id)}
            firstDay={props.dayOfTheWeek}>{props.children}</StyledSpan>
    );
}

export default calendarNumber;

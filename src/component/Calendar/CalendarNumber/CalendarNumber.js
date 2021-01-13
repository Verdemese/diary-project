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

    &:hover {
        background-color: rgba(50, 168, 107, 0.4);
        color: white;
    }

    &.red {
        background-color: rgba(255,0,0, 0.4)
    }
    &.yellow {
        background-color: rgba(255, 255, 0, 0.4)
    }
    &.green {
        background-color: rgba(0,128,0, 0.4)
    }
    &.blue {
        background-color: rgba(0,0,255, 0.4)
    }
`

const calendarNumber = props => {

    let color;
    const amountWords = props.amountWords;
    
    if (amountWords > 0 && amountWords <= 10) color = 'red';
    if (amountWords > 10 && amountWords <= 20) color = 'yellow';
    if (amountWords > 20) color = 'green';

    return (
        <StyledSpan 
            className={color}
            onClick={props.clicked}
            firstDay={props.dayOfTheWeek}>{props.children}</StyledSpan>
    );
}

export default React.memo(calendarNumber);

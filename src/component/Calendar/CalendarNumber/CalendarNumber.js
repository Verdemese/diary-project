import React from 'react';
import styled from 'styled-components';

const StyledSpan = styled.span`
    vertical-align: baseline;
    text-align: left;
    padding: 0.5rem;
    height: 4.4rem;
    cursor: pointer;

    &:first-child {
        grid-column: ${props=> props.firstDay}
    }

    &:hover {
        background-color: rgba(50, 168, 107, 0.4);
        color: white;
    }

    &.red {
        background-color: #D65076;
    }
    &.yellow {
        background-color: RGB(239, 192, 40);
    }
    &.green {
        background-color: #009B77;
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

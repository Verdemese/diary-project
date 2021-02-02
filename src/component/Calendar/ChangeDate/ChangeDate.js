import React from 'react';
import styled from 'styled-components';

import Chart from '../../UI/Chart/Chart';

const StyledChangeDateContainer = styled.div`
    position: relative;
    color: white;    
    display: flex;
    align-items: center;
    jusify-content: space-between;
    margin-bottom: 1.5rem;
    height: 100%;

    & button {
        color: inherit;
        font-size: 3rem;
        height: 5rem;
        background-color: transparent;
        border: none;
        button-size: 3rem;
    }

    & button:hover {
        background: rgba(0, 0, 0, 0.2);
    }

    & h1 {
        text-align: center;
    }

    & > * {
        flex: auto;
    }

    @media (max-width: 599px) {
        margin-bottom: 1rem;
        height: 30vh;

        & button {
            font-size: 2rem;
        }
    }
`

const ChangeDate = props => {

    const [monthText, setMonthText] = React.useState('');

    React.useEffect(() => {
        const text = props.month;

        if (window.innerWidth < 600) {

            const [__, month] = text.split('-');
            
            return setMonthText(month);
        }

        setMonthText(text);
    }, [window.innerWidth, props.month]);

    return (
        <>
            <StyledChangeDateContainer className='changeDate'>
                <button onClick={props.prevClicked} type="button">{'<'}</button>
                <h1>{monthText}</h1>
                <Chart 
                    month={props.month}
                    datesDetail={props.datesDetail}
                    quizMethod={props.quizMethod} />
                <button onClick={props.nextClicked} type="button">{'>'}</button>
            </StyledChangeDateContainer>
        </>
    )
}

export default ChangeDate;
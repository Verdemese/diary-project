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
    margin-top: 1rem;

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

    & h1, p {
        text-align: center;
    }

    & > * {
        flex: auto;
    }

    & .monthText_mobile {
        display: none;
    }

    & .monthText_PC {
        display: block;
    }

    @media (max-width: 599px) {
        height: 30vh;

        & button {
            font-size: 2rem;
        }

        & .monthText_mobile {
            display: block;
        }

        & .monthText_PC {
            display: none;
        }
    }
`

const YearText = styled.div`
    display: none;
    margin: auto;
    text-align: center;
    margin: 0.5rem 0;

    @media (max-width: 599px) {
        display: block;
    }
`

const ChangeDate = props => {

    const [monthText, setMonthText] = React.useState('');
    const [yearText, setYearText] = React.useState('');

    React.useEffect(() => {

        const [year, month] = props.month.split('-');

        setMonthText(month);
        setYearText(year);

    }, [props.month]);

    return (
        <>
            <StyledChangeDateContainer className='changeDate'>
                <button onClick={props.prevClicked} type="button">{'<'}</button>
                <h1 className='monthText_PC'>{props.month}</h1>
                <h1 className='monthText_mobile'>{monthText}</h1>
                <Chart 
                    month={props.month}
                    datesDetail={props.datesDetail}
                    quizMethod={props.quizMethod} />
                <button onClick={props.nextClicked} type="button">{'>'}</button>
            </StyledChangeDateContainer>
            <YearText>{yearText}</YearText>
        </>
    )
}

export default React.memo(ChangeDate);
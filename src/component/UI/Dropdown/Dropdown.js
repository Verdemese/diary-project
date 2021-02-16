import React from 'react';
import styled from 'styled-components';
import { withRouter ,Link } from 'react-router-dom';

const StyledDropdown = styled.ul`   
    background: white;
    position: absolute;
    right: 0;
    top: 0;
    overflow: hidden;
    margin-top: 4.1rem;
    z-index: 40;
    max-height: 0;
    width: 8rem;
    transition: all 0.07s ease-out;
    border-radius: 10px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);

    &.toggle {
        max-height: 20rem;
    }

    & li {
        height: 2.5rem;
        display: ${(props) => props.pathname === "calendar" ? "block" : "none"};
    }

    & .calendar {
        display: ${(props) => props.pathname === "calendar" ? "none" : "block"};
    }

    & .signOut {
        display: block;
    }

    & button {
        cursor: pointer;
        width: 100%;
        height: 100%;
        background-color: transparent;
        border: none;
        font-size: 0.7rem;
    }

    & button:hover {
        background: #0366d6;
        color: white;
    }

    @media (max-width: 599px) {
        margin-top: 3.1rem;
    }

`

const dropdown = props => {

    const pathname = props.location.pathname.split('/')
        .find(item => item.includes('calendar'));

    return (
        <StyledDropdown 
            className={props.toggleDropdown ? 'toggle' : null} 
            pathname={pathname}>
            <li className='calendar'>
                <Link to='calendar'>
                    <button type='button'>home</button>
                </Link>
            </li>
            <li>
                <Link to='profile'>
                    <button type='button'>profile</button>
                </Link>
            </li>
            <li>
                <Link to='quiz' >
                    <button type='button'>quiz</button>
                </Link>
            </li>
            <li className='signOut'>
                <Link replace={true} to='/'>
                    <button onClick={props.signOutClicked} type='button'>sign-out</button>
                </Link>
            </li>
        </StyledDropdown>
    );
}

export default withRouter(dropdown);
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledDropdown = styled.ul`   
    .userUI:focus-within & {
        max-height: 20rem;
    }    

    background: white;
    position: absolute;
    right: 0;
    top: 0;
    overflow: hidden;
    margin-top: 4.1rem;
    z-index: 40;
    max-height: 0;
    width: 8rem;
    transition: all 0.2s ease-in;
    border-radius: 10px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);

    & li {
        height: 2.5rem;
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
    return (
        //<StyledDropdown className={props.toggleDropdown ? 'toggle' : null}>
        <StyledDropdown>
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
            <li>
                <Link replace={true} to='/'>
                    <button onClick={props.signOutClicked} type='button'>sign-out</button>
                </Link>
            </li>
        </StyledDropdown>
    );
}

export default dropdown;
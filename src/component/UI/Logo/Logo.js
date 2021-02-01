import React from "react";
import styled from 'styled-components';

import logoIcon from '../../../assets/logo-icon.png';
//background: `transparent no-repeat center/100% url(${logoIcon})`

const LogoContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    & img {
        width: 4rem;
        aspect-ratio: 1;
        padding: 0 0.5rem;
    }

    @media (max-width: 599px) {

        justify-content: flex-start;

        & p {
            display: none;
        }
        
        & img {
            width: 3.5rem;
        }
    }
`

const logo = props => (
    <>
        <LogoContainer>
            <img src={logoIcon} alt='logo' />
            <p style={{
                margin: '0',
                textAlign: 'center',
                fontSize: '2rem',
                fontFamily: `Hachi Maru Pop, cursive`,
            }}>Engry</p>
        </LogoContainer>
    </>
)

export default logo;
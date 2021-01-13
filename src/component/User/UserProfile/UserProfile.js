import React from 'react';
import styled from 'styled-components';
import { SwapLeftOutlined } from '@ant-design/icons';


import Logo from '../../UI/Logo/Logo';
import Button from '../../UI/Button/Button';
import UserIcon from '../../UI/UserIcon/UserIcon';

const StyledProfile = styled.div`
    position: relative;
    display: block;
    width: 33rem;
    background-color: white;
    height: 26rem;
    margin: auto;
    border-radius: 40px;

    & > form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 80%;
        height: 100%;
        margin: auto;
        text-align: center;
    }

    & input {
        margin: 0.9rem;
    }

    & input {
        font-size: 1rem;
        width: 80%;
        padding: 10px;
        border: none;
        border-bottom: 1px solid black;
    }

    @media (max-width: 599px) {
        display: block;
        width: 100%;
        background-color: white;
        height: 20rem;
        margin: auto;
        border-radius: 0;
    
        & > form {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 90%;
            height: 100%;
            margin: auto;
            text-align: center;
        }
    
        & > input {
            font-size: 1rem;
            margin: 0.9rem;
            width: 80%;
            padding: 10px;
            border: none;
            border-bottom: 1px solid black;
        }
    }

`

const StyledButtonContainer = styled.div`
    margin-top: 2rem;
    width: 100%;
    padding: 0 2rem;
    text-align: center;
    display: flex;
`

const userProfile = props => {

    return (
    <>
        <Logo></Logo>
        <StyledProfile>
            <form onSubmit={props.profileSubmitted}>
                <SwapLeftOutlined style={{fontSize: '2rem', position: 'absolute', right: '5%', top: '5%'}}/>    
                <div className='userIcon'>
                    <UserIcon width='10rem' height='10rem' profilePic={props.profilePic}/>
                    <input type='file' name='fileSelector' onChange={props.photoChanged}/>
                </div>
                <input 
                    type="text" 
                    name="nickname" 
                    placeholder="Your nickname" 
                    autoComplete="off"/>
                <StyledButtonContainer>
                    <Button buttonType='submit'>Check!</Button>
                </StyledButtonContainer>
            </form>
        </StyledProfile>
    </>
    )
}


export default userProfile;

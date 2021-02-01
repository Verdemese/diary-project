import React, { useState, useEffect } from 'react';
import firebase from '../../firebase';
import styled from 'styled-components';
import { connect } from 'react-redux';


import Logo from '../../component/UI/Logo/Logo';
import Button from '../../component/UI/Button/Button';
import UserIcon from '../../component/User/UserIcon/UserIcon';

const StyledProfile = styled.div`
    position: relative;
    display: block;
    width: 30rem;
    background-color: white;
    height: 26rem;
    margin: 2rem auto;
    border-radius: 10px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);

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
    display: flex;
    justify-content: center;
`



const UserProfile = props => {

    const [currentPic, setCurrentPic] = useState(null);
    const [currentUsername, setCurrentUsername] = useState(null);

    useEffect(() => {

        const user = firebase.auth().currentUser;

        if (!currentPic) {
            setCurrentPic(user.photoURL);
            setCurrentUsername(user.displayName);
        }
    }, [currentPic, currentUsername]);


    const submitProfileHandler = (event) => {
        event.preventDefault();

        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: event.target.nickname.value ? event.target.nickname.value : currentUsername,
            photoURL: currentPic
        })
            .then(() => props.history.push({
                pathname: '/calendar'
            }))

    }

    const changePhotoHandler = (event) => {
        if (!event.target.files['0']) return;

        const changedPhoto = event.target.files['0'];

        setCurrentPic(URL.createObjectURL(changedPhoto));
    }

    const backwardsHandler = () => {
        props.history.goBack();
    }

    return (
        <>
            <Logo></Logo>
            <StyledProfile>
                <form onSubmit={event => submitProfileHandler(event)}>
                    <div className='userIcon'>
                        <UserIcon width='10rem' height='10rem' profilePic={currentPic} />
                        <input type='file' name='fileSelector' onChange={event => changePhotoHandler(event)} />
                    </div>
                    <input
                        type="text"
                        name="nickname"
                        placeholder="Your nickname"
                        autoComplete="off" />
                    <StyledButtonContainer>
                        <Button funcType='check' buttonType='submit'>Check!</Button>
                        <Button 
                            funcType='cancel'
                            buttonType='button'
                            clicked={backwardsHandler}>cancel</Button>
                    </StyledButtonContainer>
                </form>
            </StyledProfile>
        </>
    )
}

const mapStateToProps = state => {
    return {
        profile: state.ui.userProfile
    }
}

export default connect(mapStateToProps)(UserProfile);

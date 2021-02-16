import React, { useState, useEffect } from 'react';
import firebase from '../../firebase';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Button from '../../component/UI/Button/Button';
import UserIcon from '../../component/User/UserIcon/UserIcon';
import galleryIcon from '../../assets/gallery-icon.svg';

import { updateUserProfile, userProfile } from '../../store/reducers/UIreducer';

const StyledProfile = styled.div`
    position: relative;
    display: block;
    width: 30rem;
    background-color: white;
    max-height: auto;
    padding: 5%;
    margin: 2rem auto;
    border-radius: 10px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);

    & > form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
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

    & .userIcon {
        position: relative;
    }

    & .userIcon label {
        position: absolute;
        width: 25%;
        aspect-ratio: 1;
        margin: 0;
        border: 5px solid white;
        bottom: 0;
        right: 0;
        border-radius: 50%;
        background: white no-repeat center/90% url(${galleryIcon});
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    }

    & .changePicture {
        display: none;
    }

    @media (max-width: 599px) {
        display: block;
        width: 100%;
        padding: 10%;
        max-height: auto;
        margin: 1rem auto;
    
        & input {
            font-size: 1rem;
            margin: 0.5rem;
            width: 80%;
            padding: 10px;
            border: none;
            border-bottom: 1px solid black;
        }
    }

`

const StyledButtonContainer = styled.div`
    margin-top: 1.5rem;
    width: 100%;
    display: flex;
    justify-content: center;
`

const UserProfile = props => {

    const [currentPic, setCurrentPic] = useState(null);
    const [downloadedPic, setDownloadedPic] = useState(null);
    const [currentUsername, setCurrentUsername] = useState(null);

    useEffect(() => {
        const user = firebase.auth().currentUser;

        if (user) {
            const storage = firebase.storage();
            storage.ref('users/' + props.userData.uid + '/profile.jpg')
                .getDownloadURL()
                .then(image => setDownloadedPic(image))
                .catch(error => {
                    console.log(error.code);
                });

            setCurrentUsername(user.displayName);
        }
    }, [props.userData]);

    const submitProfileHandler = (event) => {
        event.preventDefault();

        const user = firebase.auth().currentUser;
        const username = event.target.nickname.value;

        if (user) {
            if (downloadedPic && !currentPic) {
                //사진 선택을 취소하거나, 사진을 변경하지 않았을 때
                user.updateProfile({
                    displayName: username ? username : currentUsername,
                }).then(() => {
                    props.history.push({ pathname: '/calendar' });
                });
            } else if (currentPic) {
                //로딩한 사진이 이미 존재하거나, 혹은 사진을 변경하였을 때
                firebase.storage().ref('users/' + props.userData.uid + '/profile.jpg')
                    .put(currentPic)
                    .then(snapshot => {
                        user.updateProfile({
                            displayName: username ? username : currentUsername,
                        }).then(() => {
                            props.history.push({ pathname: '/calendar' });
                        });
                    });
            } else {
                user.updateProfile({
                    displayName: username ? username : currentUsername,
                }).then(() => {
                    props.history.push({ pathname: '/calendar' });
                });
            }

            const updatedUserProfile = {
                profilePic: downloadedPic && !currentPic ? downloadedPic : URL.createObjectURL(currentPic),
                displayName: !username ? user.displayName : username 
            }

            props.userProfile(updatedUserProfile);
            //props.updateUserProfile(props.userData.uid);
        }
    }

    const changePhotoHandler = (event) => {
        if (!event.target.files['0']) return;

        const changedPhoto = event.target.files['0'];

        setCurrentPic(changedPhoto);
    }

    const backwardsHandler = () => {
        props.history.goBack();
    }

    let profilePicture = downloadedPic;

    if (currentPic) {
        profilePicture = URL.createObjectURL(currentPic);
    }

    return (
        <>
            <StyledProfile>
                <form onSubmit={event => submitProfileHandler(event)}>
                    <div className='userIcon'>
                        <UserIcon profilePic={profilePicture} />
                        <input
                            id='changePicture'
                            className='changePicture'
                            type='file'
                            name='fileSelector'
                            onChange={event => changePhotoHandler(event)} />
                        <label htmlFor='changePicture'></label>
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
        userData: state.user.userData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateUserProfile: uid => dispatch(updateUserProfile(uid)),
        userProfile: (profile) => dispatch(userProfile(profile))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

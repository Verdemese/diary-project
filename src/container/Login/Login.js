import React, { Component } from "react";
import { connect } from 'react-redux';

//import firebase from "firebase";
import firebase from "../../firebase";

import SignIn from "../../component/User/SignIn/SignIn";
import Spinner from '../../component/UI/Spinner/Spinner';

//import {
//    storeUserData,
//} from '../../store/user/userActionCreator';

import {
    storeUserData,
} from '../../store/reducers/userReducer';

import {
    checkAuthentication
} from '../../store/reducers/UIreducer';

class Login extends Component {

    state = {
        loading: false,
        errorMessage: null,
    }

    changePageToSignUpHandler = () => {
        this.props.history.push({
            pathname: '/sign-up'
        })
    }

    signInHandler = (event) => {
        event.preventDefault();

        let email = event.target.email.value;
        let password = event.target.password.value;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => {

                console.log('logged');

                this.props.getUserData(user.user.uid);
                this.props.history.push({
                    pathname: '/calendar'
                });
                
            })
            .catch(error => {

                console.log(error);

                let errorMessage;

                if (error.code === 'auth/invalid-email') {
                    errorMessage = 'Check your email format!';
                } else  {
                    errorMessage = 'Check your email or password!';
                }

                this.setState({ errorMessage });
        });
    }


    render() {

        let spinner = <Spinner />;

        //console.log(this.props);

        return (
            <>
                <SignIn signInError={this.state.errorMessage}
                    signInSubmitted={(event) => this.signInHandler(event)}
                    signUpClicked={this.changePageToSignUpHandler} />;
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        userData: state.user.userData,
        profile: state.ui.userProfile,
        userToken: state.user.userToken,
        auth: state.ui.authenticated
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserData: (userData) => dispatch(storeUserData(userData)),
        //userProfile: (profile) => dispatch(userProfile(profile)),
        checkAuth: () => dispatch(checkAuthentication()),
        //getUserToken: (userToken) => dispatch(storeUserToken(userToken))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
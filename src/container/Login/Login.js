import React, { Component } from "react";
import { connect } from 'react-redux';
import firebase from "../../firebase";

import SignIn from "../../component/User/SignIn/SignIn";

import {
    storeUserData,
    resetUserState
} from '../../store/reducers/userReducer';

import {
    convertAuthentication,
    resetUIState
} from '../../store/reducers/UIreducer'

class Login extends Component {

    state = {
        loading: false,
        errorMessage: null,
    }

    componentDidMount() {
        const user = firebase.auth().currentUser;

        if (user) {
            firebase.auth().signOut();
        }

        this.props.resetUIState();
        this.props.resetUserState();
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
                if (user) {
                    this.props.convertAuthentication();
                    this.props.getUserData(user.user.uid);
                    this.props.history.push({
                        pathname: '/calendar'
                    });
                }
            })
            .catch(error => {
                let errorMessage;

                if (error.code === 'auth/invalid-email') {
                    errorMessage = 'Check your email format!';
                } else {
                    errorMessage = 'Check your email or password!';
                }

                this.setState({ errorMessage });
        });
    }


    render() {
        return (
            <>
                <SignIn signInError={this.state.errorMessage}
                    signInSubmitted={(event) => this.signInHandler(event)}
                    signUpClicked={this.changePageToSignUpHandler} />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        userData: state.user.userData,
        profile: state.ui.userProfile,
        authenticated: state.ui.authenticated,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserData: (userData) => dispatch(storeUserData(userData)),
        convertAuthentication: () => dispatch(convertAuthentication()),
        resetUIState: () => dispatch(resetUIState()),
        resetUserState: () => dispatch(resetUserState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
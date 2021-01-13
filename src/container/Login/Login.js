import React, { Component } from "react";

//import firebase from "firebase";
import firebase from "../../firebase";

import CalendarBuilder from "../CalendarBuilder/CalendarBuilder";
import SignUp from "../../component/User/SignUp/SignUp";
import SignIn from "../../component/User/SignIn/SignIn";
import Spinner from '../../component/UI/Spinner/Spinner';
import Toolbar from '../../component/UI/Toolbar/Toolbar';
import UserProfile from '../../component/User/UserProfile/UserProfile';

//const firebaseConfig = {
//    apiKey: "AIzaSyATl0Fe0IATE2c1SlgWajbwRkGJz6qOZC4",
//    authDomain: "english-diary-project.firebaseapp.com",
//    databaseURL: "https://english-diary-project-default-rtdb.firebaseio.com",
//    projectId: "english-diary-project",
//    storageBucket: "english-diary-project.appspot.com",
//    messagingSenderId: "115479339242",
//    appId: "1:115479339242:web:c65c5d21e3f3ac2849b793",
//    measurementId: "G-7N02KWNP5Q"
//};

//if (!firebase.apps.length) {
//    firebase.initializeApp(firebaseConfig);
//} else {
//    firebase.app();
//}

class Login extends Component {

    state = {
        isAuthenticated: false,

        userData: {},
        userNickname: null,
        signUp: false,
        profile: false,
        changeProfile: false,
        loading: false,
        signUpError: null,
        signInError: null,
        activatedDropdown: false,
        photoURL: null
    }

    componentDidMount() {
        const script1 = document.createElement('script');
        const script2 = document.createElement('script');
        const script3 = document.createElement('script');

        script1.src = "/__/firebase/8.2.1/firebase-app.js";
        script2.src = "/__/firebase/8.2.1/firebase-analytics.js";
        script3.src = "/__/firebase/init.js";

        [script1, script2, script3].forEach(script => {
            document.body.appendChild(script);
        });

        //        <!-- The core Firebase JS SDK is always required and must be listed first -->
        //<script src="/__/firebase/8.2.1/firebase-app.js"></script>

        //<!-- TODO: Add SDKs for Firebase products that you want to use
        //     https://firebase.google.com/docs/web/setup#available-libraries -->
        //<script src="/__/firebase/8.2.1/firebase-analytics.js"></script>

        //<!-- Initialize Firebase -->
        //<script src="/__/firebase/init.js"></script>

    }

    changePageToSignUpHandler = () => {
        this.setState({ signUp: true });
    }

    signInHandler = (event) => {
        event.preventDefault();

        this.setState({ signInError: null });

        let email = event.target.email.value;
        let password = event.target.password.value;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => {
                console.log(user);
                this.setState({ userData: user.user, isAuthenticated: true });
            })
            .then(() => {
                let user = firebase.auth().currentUser;

                if (user) {
                    this.setState({ userNickname: user.displayName, photoURL: user.photoURL });
                }
            })
            .catch(error => {

                console.log(error);

                let errorMessage;

                if (error.code === 'auth/invalid-email') {
                    errorMessage = 'Check your email format!';
                } else  {
                    errorMessage = 'Check your email or password!';
                }

                this.setState({ signInError: errorMessage });
        });

       
    }

    signUpHandler = (event) => {
        event.preventDefault();

        this.setState({ signUpError: null });

        const email = event.target.email.value;
        const password = event.target.password.value;
        const checkPassword = event.target.checkPassword.value;

        let errorMessage;

        if (password !== checkPassword) {

            errorMessage = "Password doesn't match!";

            return this.setState({ signUpError: errorMessage });
        }

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => {
                console.log(user);
                this.setState({ signUp: false, profile: true });
            })
            .catch(error => {
                console.log(error);

                if (error.code === 'auth/invalid-email') {
                    errorMessage = 'Check your email format!';
                } else if (error.code === 'auth/email-already-in-use') {
                    errorMessage = 'Email already exist!';
                } else if (error.code === 'auth/weak-password') {
                    errorMessage = 'Password should be at least 6 characters!';
                }

                this.setState({ signUpError: errorMessage });
            });

    }

    signOutHandler = () => {
        firebase.auth().signOut()
            .then(() => {
                this.setState({ isAuthenticated: false, userData: {} });
            })
            .catch(error => {
                console.log(error);
            });
    }

    setProfileHandler = (event) => {
        event.preventDefault();

        const user = firebase.auth().currentUser;

        const nickname = event.target.nickname.value;

        user.updateProfile({ displayName: nickname, photoURL: this.state.photoURL })
            .then(() => {
                this.setState({ userNickname: user.displayName, photoURL: user.photoURL, profile: false });
            })
    }

    changeProfileHandler = () => {
        this.setState({ profile: true });
    }


    activateDropdownHandler = () => {
        this.setState({ activatedDropdown: !this.state.activatedDropdown });
    }

    changePhotoHandler = (event) => {
        if (!event.target.files['0']) return;

        if (event.target.files === undefined) {
            
        }

        const changedPhoto = event.target.files['0'];

        this.setState({ photoURL: URL.createObjectURL(changedPhoto) });
    }


    render() {

        //console.log(this.state.userNickname);

        let spinner = <Spinner />;

        let sign = <SignIn
            signInError={this.state.signInError}
            signInSubmitted={(event) => this.signInHandler(event)}
            signUpClicked={this.changePageToSignUpHandler} />;

        if (this.state.signUp) {
            sign = <SignUp
                signUpError={this.state.signUpError}
                signUpSubmitted={(event) => this.signUpHandler(event)} />;
        } else if (this.state.profile) {
            sign = <UserProfile
                profilePic={this.state.photoURL}
                profileSubmitted={event => this.setProfileHandler(event)}
                photoChanged={event => this.changePhotoHandler(event)}/>
        } else if (this.state.isAuthenticated) {
            sign = (
                <>
                    <Toolbar 
                        profilePic={this.state.photoURL}
                        profileChangeClicked={this.changeProfileHandler}
                        nickname={this.state.userNickname}
                        profileClicked={this.activateDropdownHandler}
                        toggleDropdown={this.state.activatedDropdown}
                        signOut={this.signOutHandler}/>
                    <CalendarBuilder userUID={this.state.userData.uid}/>
                </>
            );
        }

        return (
            <>
                {sign}
            </>
        );
    }
}

export default Login;
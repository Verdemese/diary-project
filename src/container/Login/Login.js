import React, { Component } from "react";

import firebase from "firebase";

import CalendarBuilder from "../CalendarBuilder/CalendarBuilder";
import SignUp from "../../component/User/SignUp/SignUp";
import SignIn from "../../component/User/SignIn/SignIn";
import Spinner from '../../component/UI/Spinner/Spinner';
import Toolbar from '../../component/UI/Toolbar/Toolbar';

const firebaseConfig = {
    apiKey: "AIzaSyATl0Fe0IATE2c1SlgWajbwRkGJz6qOZC4",
    authDomain: "english-diary-project.firebaseapp.com",
    databaseURL: "https://english-diary-project-default-rtdb.firebaseio.com",
    projectId: "english-diary-project",
    storageBucket: "english-diary-project.appspot.com",
    messagingSenderId: "115479339242",
    appId: "1:115479339242:web:c65c5d21e3f3ac2849b793",
    measurementId: "G-7N02KWNP5Q"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

//firebaseAdmin.initializeApp({
//    credential: firebaseAdmin.credential.cert({
//        "type": "service_account",
//        "project_id": "english-diary-project",
//        "private_key_id": "eddcf5c084b10a79d7255403da24db18a32d6011",
//        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCxF+H9hefbHkUu\nIW5OZJiABVPxFIwmsrsxzoY+L6fhPN0wcFYSmGxpSGekGDApiFbBFpGuUtgldq21\nUbn+XOpo471zuwj+VPVC8EpHB3g+O2NfkBMgnJQ5j65GSz8IIyMDeIDqzKPlYwL4\nBfzAg3zwfBY2s97wQGwZoow/OsbwhWkuUTN4XFwmRPVN5xQqhEqY9DffgA2/Mp0D\n8H5Xokx5qWC8Ms1xav1o/wNFsThJbKPlrQsi7aIXfHbcEnJbtCa/KXWL6bVwLTdm\nAYY2hUFgOJ7pbqZ+cJVccQHjsXK2/jmfTR92jZz4dbMA47StyuhlIIMQ/9x2uXBL\nTeNOj71VAgMBAAECggEAD6pObBv8gMJKedRsusQExmxSOtTnueOdEgCUGOujxNWa\ntlZ1krMHgf+s5VPbbM0Z6X4q2FoNMzEumAe49XJ4LNuabmKY3tCamneBhot3XD/q\nIDGxM3UOWpImZyLwWjKrffraooqEI/4wbMqwy0HGW0qKt3+NRMDaHyFlGRHEt9Fb\nSlkj/wpYs6gGKs/QcH90cEbtSd1Y/3kXxjX3DeSsj4V6eG2p8Hii3SfG0vtgblFn\nGLnuF8slPPMiR9pCkQVRTmEtQ3FFDJCHB+9awwLk1uoZYbHMZzXtg6yyzmeU1VEN\nOmVkDmRMuv4uGmbl35A5sHOg3acIVvrSbuvz0J2ZyQKBgQD1VPDcGd7FFzsa5ETV\nwzI2QDKANVdlr/X5hm++y+uX2XTQ37LlymbiKGQHO3uB8y78eSdf1dd0LoQIc8sy\n6p6aeZwbUA5oCvH433pdv1xnWjuj1DGGWPxxZ1tANQ2VoF9lIXhrLUXbHU8rs8jZ\nA7QhrvoZOtiEL5lGAxaM2DOJGQKBgQC4y03B3HuXnFCXqadmNcdvOfkOgFLEnbvI\nfjW+ZJFcON8xMyqhANfHOiyQ8XYAGH3z/VyvyM8rpIejrLCMV9HCu6I7uc6sWvje\nhplouPiz94dlDSCu1ZEToAaORAMuWzF1JM/4Zl2C2br23W1VrVSN6lfE3mH898EE\nhstZCuoRnQKBgGMFScJM3tGGMuEDyZTOGHI1Lyz4WrI8d3ejf27vN8QujSvRXo/J\nRgV6cAVLSOqGkSxuaioQUcofDEOtGRMQB7wp4YxUn7v2zvu4l9dG6bD9hpz1hJfJ\nSvsq0HX18+m0tUxIWiZIO63ZAp+NDUAqcoY17dRJICMaYy8TCAMJMKPhAoGASJQw\n+g8qy6UtUiPkB5Tfu6O9WiC0YVzCQECxwxGktd/waVZ7S7kVBr6melcbzXXRIl9E\nZBYuqCl6zKIqxTRIwn8HfQXBUph4Xo3m+uaLZ8O0fc/mIkTnMhoL+RxlU3OlvSi0\nNg+ecqIpeIQHSTtGlmaQClZ9jemQ+cInY9WRkVECgYBOKOeBVowsMl1LhZtI2m6g\nBH2p3X/zSjopQVgTmH7G2f5HK8+o42PQyfjVwGtuO5nCKAXBCQc7qkpc4AjY2KsM\nhhDMuu6wbh1lMkH8M2OqOVP2tTx/x4XjYNCHobFOXhYu02qF89eB56plN9qDs3PP\nsKHCIYMVWNKUIh7I6oqY7w==\n-----END PRIVATE KEY-----\n",
//        "client_email": "firebase-adminsdk-jpi76@english-diary-project.iam.gserviceaccount.com",
//        "client_id": "109732789845330427933",
//        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//        "token_uri": "https://oauth2.googleapis.com/token",
//        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-jpi76%40english-diary-project.iam.gserviceaccount.com"
//      }),
//        databaseURL: "https://english-diary-project-default-rtdb.firebaseio.com",
//        storageBucket: "english-diary-project.appspot.com",
//})


class Login extends Component {

    state = {
        isAuthenticated: false,
        userData: {},
        signUp: false,
        loading: false,
        signUpError: null,
        signInError: null,
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
                this.setState({ userData: user, isAuthenticated: true });
            })
            .catch(error => {

                let errorMessage;

                if (error.code === 'auth/user-not-found') {
                    errorMessage = 'Check your email or password!';
                } else if (error.code === 'auth/invalid-email') {
                    errorMessage = 'Check your email format!';
                }

                this.setState({ signInError: errorMessage });
            })
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
                this.setState({ signUp: false });
            })
            .catch(error => {
                console.log(error);

                if (error.code === 'auth/invalid-email') {
                    errorMessage = 'Check your email format!';
                } else if (error.code === 'auth/email-already-in-use') {
                    errorMessage = 'Email already exist!';
                }

                this.setState({ signUpError: errorMessage });
            });

    }

    render() {

        let spinner = <Spinner />;

        let sign = <SignIn
            signInError={this.state.signInError}
            signInSubmitted={(event) => this.signInHandler(event)}
            //signInSubmitted={this.props.authenticatedUser}
            signUpClicked={this.changePageToSignUpHandler} />;

        if (this.state.signUp) {
            sign = <SignUp
                signUpError={this.state.signUpError}
                signUpSubmitted={(event) => this.signUpHandler(event)} />;
        } else if (this.state.isAuthenticated) {
            sign = (
                <>
                    <Toolbar />
                    <CalendarBuilder />
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
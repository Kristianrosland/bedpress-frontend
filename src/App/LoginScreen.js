import React, { Component } from 'react';
import { FirebaseAuth } from 'react-firebaseui';
import firebase from 'firebase';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import firebaseui from 'firebaseui';
import { fetchUser } from '../actions';

class LoginScreen extends Component {
  render() {
    const uiConfig = {
      signInFlow: 'redirect',
      signInSuccessUrl: '/',
      tosUrl: 'www.fagutvalget.no',
      signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
      credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
      callbacks: {
          signInSuccess: (currentUser, credential, redirectUrl) => {
            this.props.fetchUserInfo(currentUser);
            return false;
          },
          uiShown: () => {
            //document.getElementById('loader').style.display = 'none';
          }
        },
    };

    const redirect = this.props.newUser ? <Redirect to='/myProfile' /> : <Redirect to='/'/>;
    const authComponent = !this.props.newUser && !this.props.user
      ? <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      : redirect;

    return (
      <div>
        { authComponent }
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUserInfo: user => dispatch(fetchUser(user)),
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    newUser: state.auth.newUserSignIn,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

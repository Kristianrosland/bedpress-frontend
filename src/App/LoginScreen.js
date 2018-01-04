import React, { Component } from 'react';
import { FirebaseAuth } from 'react-firebaseui';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

class LoginScreen extends Component {
  render() {
    const uiConfig = {
      signInFlow: 'redirect',
      signInSuccessUrl: '/',
      signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
      tosUrl: 'www.fagutvalget.no',
      credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
    };

    const authComponent = !this.props.user
      ? <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      : <Redirect to='/' />;

    return (
      <div>
        { authComponent }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  }
}

export default connect(mapStateToProps)(LoginScreen);

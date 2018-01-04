import React, { Component } from 'react';
import { FirebaseAuth } from 'react-firebaseui';
import firebase from 'firebase';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { uiConfig } from '../utils/firebase';

class LoginScreen extends Component {
  render() {
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

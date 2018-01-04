import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FirebaseAuth } from 'react-firebaseui';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import { authSuccess, authFail } from '../actions';
import './App.css';
import Main from './Main';

class App extends Component {
  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.props.authSuccess(user);
        } else {
          this.props.authFail(); //Signal that the user is not authenticated
        }
    });
  }

  render() {
    const uiConfig = {
      signInFlow: 'redirect',
      signInSuccessUrl: '/',
      signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
      tosUrl: 'www.fagutvalget.no',
      credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
    };

    const loading = this.props.loading ? <p> Loading.. </p> : null;
    const main = this.props.user ? <Main /> : null;
    const loginScreen = !this.props.user && !this.props.loading
      ? <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      : null;

    return (
      <div>
        { loading }
        { main }
        { loginScreen }
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authSuccess: user => dispatch(authSuccess(user)),
    authFail: () => dispatch(authFail())
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    loading: state.auth.loadingUser,
    user: state.auth.user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { FirebaseAuth } from 'react-firebaseui';
import firebase from 'firebase';
import firebaseui from 'firebaseui';

class App extends Component {

  componentWillMount() {
    const that = this;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          that.props.dispatch({ type: 'LOGGED_IN', user: user })
        } else {
          that.props.dispatch({ type: 'NO_AUTH' }) //Signal that the user is not authenticated
        }
    });
  }

  render() {
    const that = this;
    const uiConfig = {
      signInFlow: 'redirect',
      signInSuccessUrl: '/',
      signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
      tosUrl: 'www.fagutvalget.no',
      credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
    };

    const loading = this.props.loading ? <p> Loading.. </p> : null;
    const displayName = this.props.user ? <p> { this.props.user.displayName } </p> : null;
    const loginScreen = !this.props.user && !this.props.loading
      ? <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      : null;

    return (
      <div>
        { loading }
        { displayName }
        { loginScreen }
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch,
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

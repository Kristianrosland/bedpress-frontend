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

    return (
      <div>
        {
          !this.props.user &&
            <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        }
        {
          this.props.user && <p> { this.props.user.displayName } </p>
        }
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
    user: state.auth.user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

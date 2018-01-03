import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import { FirebaseAuth } from 'react-firebaseui';
import firebase from 'firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { singedIn: false };
  }

  render() {
    const uiConfig = {
      // signInFlow: 'redirect',
      // signInSuccessUrl: '/signIn',
      signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
      tosUrl: 'www.fagutvalget.no',
      credentialHelper: 'firebaseui.auth.CredentialHelper.NONE',
      callbacks: {
        signInSuccess: () => {
          this.setState({ signedIn: true });
          return true; // Avoid redirects after sign-in.
        }
      }
    };

    console.log(this.state.signedIn);

    return (
      <div>
      {
        !this.state.singedIn &&
          <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      }
      {
        this.state.singedIn &&
          <p> YES </p>
      }
      </div>
    );
  }
}

export default App;

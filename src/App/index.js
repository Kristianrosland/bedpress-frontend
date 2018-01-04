import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FirebaseAuth } from 'react-firebaseui';
import firebase from 'firebase';
import { Route } from 'react-router-dom'
import { authSuccess, authFail } from '../actions';
import './App.css';
import Main from './Main';
import Header from './Header';
import Footer from './Footer';
import LoginScreen from './LoginScreen';

class App extends Component {
  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.props.authSuccess(user);
        } else {
          this.props.authFail();
        }
    });
  }

  render() {
    const loading = this.props.loading ? <p> Loading.. </p> : null;
    const main = this.props.user ? <Main /> : null;
    const loginScreen = <LoginScreen />

    return (
      <div className='wrapper'>
        <Header />
        { loading }
        <Route path="/login" component={ () => loginScreen } />
        <Route exact path="/" component={() => main } />
        <Footer />
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

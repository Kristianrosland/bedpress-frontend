import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { Route } from 'react-router-dom'
import { authSuccess, authFail } from '../actions';
import Main from './Main';
import Header from './Header';
import Footer from './Footer';
import LoginScreen from './LoginScreen';
import MyProfilePage from './MyProfilePage';
import './App.css';

class App extends Component {
  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
          user.getIdToken().then((idToken) => {
            this.props.authSuccess(idToken);
          })
        } else {
          this.props.authFail();
        }
    });
  }

  render() {
    return (
      <div className='wrapper'>
        <Header isAuthenticated={ this.props.isAuthenticated } />
        <div className='content-wrapper'>
          <Route path="/login" component={ LoginScreen} />
          <Route exact path="/" component={ Main } />
          <Route path="/myProfile" component={ MyProfilePage } />
        </div>
        <Footer/>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authSuccess: idToken => dispatch(authSuccess(idToken)),
    authFail: () => dispatch(authFail())
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    loading: state.auth.loadingUser,
    isAuthenticated: state.auth.isAuthenticated,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

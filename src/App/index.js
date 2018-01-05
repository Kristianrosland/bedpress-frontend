import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { Route } from 'react-router-dom'
import { authSuccess, authFail } from '../actions';
import Main from './Main';
import Header from './Header';
import Footer from './Footer';
import LoginScreen from './LoginScreen';
import SingleEventPage from './SingleEventPage';
import './App.css';

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
    return (
      <div className='wrapper'>
        <Header />
        <div className='content-wrapper'>
          <Route path="/login" component={ LoginScreen} />
          <Route exact path="/" component={ Main } />
          <Route path="/event/:id?" component={ SingleEventPage } />
        </div>
        <Footer/>
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

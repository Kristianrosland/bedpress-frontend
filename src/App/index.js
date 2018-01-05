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
import NewUserPage from './NewUserPage';
import './App.css';

class App extends Component {
  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.props.authSuccess();
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
          <Route path="/event/:id?" component={ SingleEventPage } />
          <Route path="/newUser" component={  }
        </div>
        <Footer/>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authSuccess: () => dispatch(authSuccess()),
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

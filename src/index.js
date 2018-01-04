import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import thunkMiddleware from 'redux-thunk';
import firebase from 'firebase/app';

var config = {
  apiKey: "AIzaSyDiKrfHJq-FYHoHE13jPtMCbWs1N2hKDCg",
  authDomain: "bedpress-backend.firebaseapp.com",
  databaseURL: "https://bedpress-backend.firebaseio.com",
  projectId: "bedpress-backend",
  storageBucket: "bedpress-backend.appspot.com",
  messagingSenderId: "777181904263"
};
firebase.initializeApp(config);

const store = createStore(reducers, undefined, applyMiddleware(thunkMiddleware));

const MyApp = () => (
  <Provider store={store}>
    <Router>
      <Route path="/:filter?" component={App} />
    </Router>
  </Provider>
);

ReactDOM.render(<MyApp />, document.getElementById('root'));
registerServiceWorker();

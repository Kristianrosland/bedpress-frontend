import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import thunkMiddleware from 'redux-thunk';

const store = createStore(reducers, undefined, applyMiddleware(thunkMiddleware));

const MyApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<MyApp />, document.getElementById('root'));
registerServiceWorker();

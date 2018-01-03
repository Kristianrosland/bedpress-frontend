import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';

const store = createStore(reducers);

const MyApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<MyApp />, document.getElementById('root'));
registerServiceWorker();

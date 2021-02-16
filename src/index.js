import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
//import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import userReducer from './store/reducers/userReducer';
import UIreducer from './store/reducers/UIreducer';

//const rootReducer = combineReducers({
//  user: userReducer,
//  ui: UIreducer
//});

const reducer = {
  user: userReducer,
  ui: UIreducer
};

const store = configureStore({
  reducer,
  middleware: [thunk]
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

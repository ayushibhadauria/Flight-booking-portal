import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import reducer from './reducer/reducer';
import {Provider} from 'react-redux' ;
import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from '@redux-saga/core';
import { watchUpdateUser } from './sagas/saga';

const SagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(SagaMiddleware))

//SagaMiddleware.run(watchUpdateUser);

ReactDOM.render(
  <Provider store ={store}> <App/></Provider>,
  document.getElementById('root')
);

reportWebVitals();

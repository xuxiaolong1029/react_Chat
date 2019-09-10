import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'
import './index.css';
import App from './App';
import{counter} from './index.redux';

//const reduxDevtools = window.devToolsExtension?window.devToolsExtension
const store = createStore(counter,compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
));
ReactDOM.render(
    (<Provider store={store}><App/></Provider>),
    document.getElementById('root')
);
//store.subscribe(render); //订阅一次 （react 单向绑定）
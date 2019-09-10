import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import{counter,addGun,removeGun,addGunAsyns} from './index.redux';

const store = createStore(counter,applyMiddleware(thunk));
function render(){
    ReactDOM.render(<App store={store} addGun={addGun} addGunAsyns={addGunAsyns} removeGun={removeGun} />, document.getElementById('root'));
};
render();
store.subscribe(render); //订阅一次 （react 单向绑定）
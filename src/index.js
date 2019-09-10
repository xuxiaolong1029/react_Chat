import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {BrowserRouter,Route,Link} from 'react-router-dom';
import './index.css';
import App from './App';
import{counter} from './index.redux';

//const reduxDevtools = window.devToolsExtension?window.devToolsExtension
const store = createStore(counter,compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
));
function sun(){
    return <h1>张大彪</h1>
}
function er(){
    return <h1>张大彪</h1>
}
ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
        <Route path='/' exact component={App}></Route>
        <Route path='/er' component={er}></Route>
        <Route path='/sun' component={sun}></Route>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
);
//store.subscribe(render); //订阅一次 （react 单向绑定）
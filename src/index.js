import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {BrowserRouter,Route,Link,Switch} from 'react-router-dom';
import './index.css';
import reducer from './reducers';
import './config'
import App from './App';
import Auth from './Auth';

//const reduxDevtools = window.devToolsExtension?window.devToolsExtension
const store = createStore(reducer,compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
));

ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <ul className="menu">
                    <li>
                        <Link to='/'>首页</Link> 
                    </li>
                    <li>
                        <Link to='/auth'>登录</Link>
                    </li>
                </ul>
            </div>
            <Switch>
                <Route path='/' exact component={App}></Route>
                <Route path='/auth' component={Auth}></Route>
            </Switch>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
);
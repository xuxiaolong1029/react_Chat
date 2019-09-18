import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Register from './contaiiner/register/register'
import LoginPage from './contaiiner/login/login';
import BossInfo from './contaiiner/BossInfo/BossInfo';
import GeniusInfo from './contaiiner/GeniusInfo/index';
import AuthRoute from './component/authroute/authroute';
import Dashboard from './component/dashboard/index';
import Chat from './component/chat/index'
import reducer from './reducers';
import './config'
import './index.css'

const store = createStore(reducer,compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
));
ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute/>
                <Switch>
                    <Route path='/bossinfo' component={BossInfo}>
                    </Route>
                    <Route path='/geniusinfo' component={GeniusInfo}>
                    </Route>
                    <Route path='/login' component={LoginPage}>
                    </Route>
                    <Route path='/register' component={Register}>
                    </Route>
                    <Route path='/chat/user' component={Chat}>
                    </Route>
                    <Route component={Dashboard}>
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
);

//react常用插件：immutable（优化react）  reselect(优化redux)
//服务端渲染
/*
*  RenderToString和RenderToStaticMarkup(react16前)
*  RenderToNodeStream(react16)
* 客户端hydrate取代render
* */
//react项目 SSR实战，build代码后的事情
/*
* 后node使用babel-node 配置node里的react环境
* 修改客户端代码，抽离App组件，前后端共享
* 服务端生成DOM结构，渲染，加载build后的css和js
* */
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
                    <Route path='/chat' component={Chat}>
                    </Route>
                    <Route component={Dashboard}>
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
);

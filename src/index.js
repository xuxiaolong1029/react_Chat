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
import {BrowserRouter} from 'react-router-dom';
import reducer from './reducers';
import App from './app'
import './config'
import './index.css'

const store = createStore(reducer,compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
));
ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
            <App></App>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
);

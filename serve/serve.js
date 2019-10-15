//require("@babel/register")
import "@babel/polyfill";
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import jwt from 'jsonwebtoken';
import expressJWT from 'express-jwt';
import cookieParser from 'cookie-parser';
import model from './dbase';
import userRouter from './user';

import React from 'react';
import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {StaticRouter} from 'react-router-dom';
import reducer from '../src/reducers';
import App from '../src/app'
import {renderToString} from 'react-dom/server';
import staticPath from '../build/asset-manifest.json';
//解决图片问题，需要require
import csshook from 'css-modules-require-hook/preset';
import assethook from 'asset-require-hook';
assethook({
    extensions:['png']
})
const Chat = model.getModel('chat');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

//解决跨域
app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
});
//只有登录接口不需要校验token
/* app.use(expressJWT({ secret: 'Bearer'}).unless({
    path: ['/user/login','/user/register','/']
})); */
// work with express

io.on('connection',function(socket){
    socket.on('CHAT_SEND',function (data) {
        const {from,to,msg} = data;
        const chatId = [from,to].sort().join('_');
        Chat.create({chatId, from, to, content: msg}, function (err, doc) {
            io.emit('recvmsg', Object.assign({},doc._doc))
        });
    })
});
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user',userRouter);

//验签
/* app.use(function (req, res, next) {
    if(req.url.startsWith('/user/') || req.url.startsWith('/static/')){
        const token = req.headers.authorization;
        console.log(token)
        if (token) {
            // 解码 token (验证 secret 和检查有效期（exp）)
            jwt.verify(token, 'Bearer', function(err, decoded) {
                if (err) {
                    switch (err.name) {
                        case 'JsonWebTokenError':
                        res.status(403).json({ code: -1, msg: '无效的token' });
                        break;
                        case 'TokenExpiredError':
                        res.status(403).json({ code: -1, msg: 'token过期' });
                        break;
                    }              
                } else {
                    // 如果验证通过，在req中写入解密结果
                    req.decoded = decoded;
                    return next(); //继续下一步路由
                }
            });

        } else {
            return res.send({
                code:403,
                success: false,
                message: '没有找到token.'
            });
        }
    }else{
        return res.sendFile(path.resolve('build/index.html'));
    }
}); */
app.use(function(req,res,next){
    if(req.url.startsWith('/user/') || req.url.startsWith('/static/')){
        return next()
    }
    const store = createStore(reducer,compose(
        applyMiddleware(thunk)
    ));
    let context = {}
    const markup = renderToString(
        (<Provider store={store}>
            <StaticRouter location = {req.url} context = { context }>
                <App></App>
            </StaticRouter>
        </Provider>)
    )
    const pageHtml=`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="stylesheet" href="/${staticPath['main.css']}">
        <title>Chat</title>
        <script>
          var vConsole = new VConsole();
        </script>
        <script src="/${staticPath['main.js']}"></<script>
      </head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root">${markup}</div>
      </body>
    </html>`
    res.send(pageHtml)
    //return res.sendFile(path.resolve('build/index.html'));   
})
app.use('/',express.static(path.resolve('build')));

server.listen(9093,function(){
    console.log('Node app start at port 9093');
});

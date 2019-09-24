const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');
const cookieParser = require('cookie-parser');
const model = require('./dbase');
const Chat = model.getModel('chat');
const userRouter = require('./user');
//新建app
const app = express();
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
app.use(expressJWT({ secret: 'Bearer'}).unless({
    path: ['/user/login','/user/register','/']
}));
//验签
app.use(function (err, req, res, next) {
    const token = req.headers.authorization;
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
                next(); //继续下一步路由
            }
        });
    } else {
        return res.send({
            code:403,
            success: false,
            message: '没有找到token.'
        });
    }
});
// work with express
const server = require('http').Server(app);
const io = require('socket.io')(server);
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

app.get('/',function(req,res){
 res.send('<h1>hello world</h1>')
});

server.listen(9093,function(){
    console.log('Node app start at port 9093');
});

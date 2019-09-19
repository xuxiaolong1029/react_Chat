const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const model = require('./dbase');
const Chat = model.getModel('chat');
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
        console.log(data);
    })
});
const userRouter = require('./user');

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user',userRouter);

app.get('/',function(req,res){
 res.send('<h1>hello world</h1>')
});

server.listen(9093,function(){
    console.log('Node app start at port 9093');
});

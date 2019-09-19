const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
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
        const {text} = data;
        console.log(text);
        io.emit('recvmsg',data)
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

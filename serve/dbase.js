const mongoose = require('mongoose')
//链接mongo
const DB_URL = 'mongodb://localhost:27017/User'
mongoose.connect(DB_URL);
mongoose.connection.on('connected',function(){
    //是否连接成功
    console.log('mongo connect success')
});
let mongoose = require('mongoose');
/**
 * 连接
 */
const DB_URL = 'mongodb://localhost:27017/User'
mongoose.connect(DB_URL,{useNewUrlParser: true});
/**
  * 连接成功
  */
mongoose.connection.on('connected', function () {    
    console.log('Mongoose connection succuss' );  
});    

/**
 * 连接异常
 */
mongoose.connection.on('error',function (err) {    
    console.log('Mongoose connection error: ' + err);  
});    
 
/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {    
    console.log('Mongoose connection disconnected');  
}); 


module.exports = mongoose;
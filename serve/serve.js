const express = require('express');
const userRouter = require('./user');

//新建app
const app = express();

app.use('/user',userRouter)

app.get('/',function(req,res){
 res.send('<h1>hello world</h1>')
})

app.listen(9093,function(){
    console.log('node app start at port 9093')
})
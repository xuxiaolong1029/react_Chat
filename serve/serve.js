const express = require('express');
const mongoose = require('mongoose')
//链接mongo
const DB_URL = 'mongodb://localhost:27017'
mongoose.connect(DB_URL);
mongoose.connection.on('connected',function(){
    //是否连接成功
    console.log('mongo connect success')
});
//类似mysql的表 mongo里有文档、字段的概念
const User = mongoose.model('user',new mongoose.Schema({
    user:{type:String,require:true},
    age:{type:Number,require:true}
}))
//新增数据
// User.create({
//     user:'XUxiaolong',
//     age:28
// },function(err,doc){
//     if(!err){
//         console.log(doc)
//     }else{
//         console.log(err)
//     }
// })
//修改数据
// User.update({'user':'XUxiaolong'},{'$set':{age:15}},function(err,doc){
//     console.log(doc)
// })
//删除数据
// User.remove({age:26},function(err,doc){
//     console.log(doc)
// })
//新建app
const app = express();
app.get('/',function(req,res){
    res.send('<h1>hello world</h1>')
})
app.get('/data',function(req,res){
    User.findOne({user:'XUxiaolong'},function(err,doc){
        console.log(doc)
        res.json(doc)
    })
})


app.listen(9790,function(){
    console.log('node app start at port 9790')
})
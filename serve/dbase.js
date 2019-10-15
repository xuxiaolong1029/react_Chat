import mongoose from 'mongoose';
//链接mongo
const DB_URL = 'mongodb://localhost:27017/imooc-chat'
mongoose.connect(DB_URL);
const models={
    user:{
        'user':{type:String,require:true},
        'pwd':{type:String,require:true},
        'type':{type:String,require:true},
        'avatar':{type:String},//头像
        'desc':{type:String},//个人简介
        'title':{type:String},//职位名
        //如果是boss
        'company':{type:String},
        'money':{type:String}
    },
    chat:{
        'chatId':{type:String,require:true},//聊天id
        'from':{type:String,require:true},//发送人
        'to':{type:String,require:true},//接收人
        'content':{type:String,require:true,default:''},//发送内容
        'read':{type:Boolean,require:true,default:false},//已读未读
        'create_time':{type:Number,default:new Date().getTime()}//时间
    }
};

for(let m in models){
    mongoose.model(m,new mongoose.Schema(models[m]))
}
module.exports = {
    getModel:function(name){
        return mongoose.model(name)
    }
}

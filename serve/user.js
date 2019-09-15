const express = require('express');
const utility  = require('utility');
const Router = express.Router();
const model = require('./dbase');
const User = model.getModel('user');

Router.get('/list',function(req,res){
    User.find({},function(err,doc){
        return res.json(doc)
    })
})

Router.post('/register',function(req,res){
    console.log(req.body);
    const {user,pwd,type} = req.body;
    User.findOne({user:user},function(err,doc){
        if(doc){
            return res.json({code:1,msg:'用户名重复'})
        }else{
            User.create({user,type,pwd:md5Pwd(pwd)},function(e,d){
                if(e){
                   return res.json({code:1,msg:'服务端出错了'}) 
                }
                return res.json({code:0})
            })
        }
    })
})
Router.get('/info',function(req,res){
    //cookie校验
    return res.json({code:0})
})
function md5Pwd(pwd){
    const salt = 'imooc_is_good';
    return utility.md5(utility.md5(pwd+salt))
}
module.exports = Router
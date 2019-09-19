const express = require('express');
const utility  = require('utility');
const Router = express.Router();
const model = require('./dbase');
const User = model.getModel('user');
const Chat = model.getModel('chat');
const _filter = {'pwd':0,'_v':0};

Router.get('/list',function(req,res){
    //User.remove({},function(e,d){}) 删除所有用户信息
    const {type}=req.query;
    User.find({type},function(err,doc){
        return res.json({code:0,data:doc})
    })
})

Router.post('/register',function(req,res){
    const {user,pwd,type} = req.body;
    User.findOne({user:user},function(err,doc){
        if(doc){
            return res.json({code:1,msg:'用户名重复'})
        }
        const userModel = new User({user,type,pwd:md5Pwd(pwd)});
        userModel.save(function(e,d){
            if(e){
                return res.json({code:1,msg:'服务端出错了'})
             }
             const {user,type,_id} = d
             res.cookie('userid',_id)
             return res.json({code:0,data:{user,type,_id}})
        })
    })
});
Router.post('/updata',function(req,res){
    const userid = req.cookies.userid
    if(!userid){
        return json.dumps({code:1})
    }
    const body = req.body;
    //findByIdAndUpdate 查找并更新
    User.findByIdAndUpdate(userid,body,function(err,doc){
        const data = Object.assign({},{
            user:doc.user,
            type:doc.type
        },body);
        return res.json({code:0,data:data})
    })
});
Router.post('/login',function(req,res){
    const {user,pwd} = req.body;
    User.findOne({user:user,pwd:md5Pwd(pwd)},_filter,function(err,doc){
        if(!doc){
            return res.json({code:1,msg:'用户名或者密码错误'})
        }
        res.cookie('userid',doc._id);
        return res.json({code:0,data:doc})
    })
});
Router.get('/info',function(req,res){
    //cookie校验
    const {userid} = req.cookies;
    if(!userid){
        return res.json({code:1,msg:'用户信息获取失败'})
    }
    User.findOne({_id:userid},_filter,function(err,doc){
        if(err){
            return res.json({code:1,msg:'后端出错了'})
        }
        if(doc){
            return res.json({code:0,data:doc})
        }
    })
});
Router.get('/getmsglist',function(req,res){
    const user = req.cookies.user;
    //'$or':[{from:user,to:user}]
    Chat.find({},function (err,doc) {
        if(!err){
            return res.json({
                code:0,msgs:doc
            })
        }
    })
});
function md5Pwd(pwd){
    const salt = 'imooc_is_good';
    return utility.md5(utility.md5(pwd+salt));
}
module.exports = Router;

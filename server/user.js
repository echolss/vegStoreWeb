const express = require('express')
const Router = express.Router();
const model = require('./module');
const User = model.getModel('user');
const Chat = model.getModel('chat');
const utils = require('utility');

const _filter = {'pwd': 0, '__v': 0};  //定义一个统一显示条件

Router.get('/info',function(req,res) {
    //用户有没有cookie
    const { userid } =req.cookies;      //读取cookie
    if(!userid) {
        return res.json({code: 1});
    }
    User.findOne({_id: userid},_filter,function(err,doc) {
        if(err) {
            return res.json({code: 1,msg: '后端出错了'})
        }
        if(doc) {
            return res.json({code:0, data: doc})
        }

    })
})
Router.get('/usertest',function(req,res) {
    //User.remove({},function(err,doc) {})  //删除所有数据
    User.find({},_filter,function(err,doc) {
        return res.json(doc)
    })
})
Router.get('/msgtest',function(req,res) {
    //User.remove({},function(err,doc) {})  //删除所有数据
    Chat.find({},function(err,doc) {
        return res.json(doc)
    })
})
Router.get('/list',function(req,res) {
    const { type } =req.query;
    //用户有没有cookie
    //User.remove({},function(err,doc) {})  //删除所有数据
    User.find({type},_filter,function(err,doc) {
        return res.json({code: 0, data: doc})
    })
})
Router.post('/register',function(req,res) {
    const {user, pwd, type} = req.body;
    User.findOne({user},function(err,doc) {
        if(doc) {
            return res.json({code: 1,msg: '用户已存在'})
        }
        /*因为create并不能返回生成后的id，需要换一种写法
        User.create({user,pwd: md5Pwd(pwd),type},function(err,doc) {
            if(err) {
                return res.json({code: 1,msg: '后端出错了'})
            }
            return res.json({code: 0})
        })
        */
        const userModel = new User({user,pwd: md5Pwd(pwd),type});
        userModel.save(function(err,doc) {
            if(err) {
                return res.json({code: 1,msg: '后端出错了'})
            }
            res.cookie('userid',doc._id);   //写入cookie
            const { user, type, _id } = doc;   //过滤返回的信息
            return res.json({code: 0, data: { user, type, _id }})
        })
    })
})

//标识信息为已读
//update默认查询到第一条

Router.post('/readmsg',function(req,res) {
    const myid = req.cookies.userid;
    const { from } = req.body;
    Chat.update(
        {from,to: myid},
        {'$set': {read: true}},
        {'multi': true},
        function(err,doc) {
            if(!err) {
                return res.json({code: 0,num: doc.nModified});
            }
            return res.json({code: 1,msg: '修改失败'});
        }
    )
})

Router.post('/login',function(req,res) {
    const {user, pwd} = req.body;
    User.findOne({user,pwd: md5Pwd(pwd)},_filter,function(err,doc) {  //第一个是查询条件，第二个是后端返回数据的显示条件
        if(doc) {
            res.cookie('userid',doc._id)  //设置cookie
            return res.json({code: 0,data: doc})
        }
        User.findOne({user},function(err,doc) {
            if(!doc) {
                return res.json({code: 1,msg: '该用户不存在'})
            }
            else if(doc) {
                return res.json({code: 1,msg: '密码错误'})
            }
            else if(err) {
                return res.json({code: 1,msg: '后端出错了'})
            }
        })
    })
})

Router.post('/update', function(req,res) {
    const userid = req.cookies.userid; //做一下cookie的校验
    if(!userid) {  //1、查找ID是否存在
        return json.dumps({code: 1})
    }
    const updateData = req.body;
    User.findByIdAndUpdate(userid,updateData,function(err,doc) {
        const data = Object.assign({},{
            user: doc.user,
            type: doc.type
        },updateData);
        if(err) {
            return res.json({code: 1,msg: '后端出错了'})
        }
        return res.json({code: 0, data})
    })
})

Router.get('/getmsglist',function(req,res) {
    const userid = req.cookies.userid;

    User.find({},function(err,userdoc) {
        let users = {};
        userdoc.forEach(v => {
            users[v._id] = {
                name: v.user,
                avatar: v.avatar
            }
        });
        Chat.find({'$or':[{from:userid},{to:userid}]},function(err,doc) {
            if(err) {
                console.log('后端出错了');
            }
            else{
                return res.json({code: 0, msgs: doc, users: users})
            }
        })
    })
    
})

function md5Pwd(pwd) {  //光用utils.md5(pwd)是不够的，可以在对应网站查出对应密码，加盐md5，外层再加md5才合格
    const salt = 'luo_sha_sha_280508950@ECHO~~~~';
    return utils.md5(utils.md5(pwd+salt));
}

module.exports = Router

//Chat.remove({},function(err,doc) {});

//post参数body来获取，get参数query来获取
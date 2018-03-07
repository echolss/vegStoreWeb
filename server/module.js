const mongoose = require('mongoose');

//连接mongo，并使用boss这个集合，若没有boss它会自动帮我新建
const DB_URL = 'mongodb://localhost:27017/boss'; 
mongoose.connect(DB_URL);

const models = {
    user: {
        'user': {type: String, require: true},
        'pwd': {type: String, require: true},
        'type': {type: String, require: true},
        'avatar': {type: String},  //头像
        'desc': {type: String},   //个人简介
        'job': {type: String},   //职位名
        //if boss
        'company': {type: String}, //公司
        'money': {type: String}   //工资
    },
    chat: {
        'chatid': {type: String, require: true},
        'from': {type: String, require: true},
        'to': {type: String, require: true},
        'read': {type: Boolean, default: false},
        'content': {type: String, require: true, default: ''},
        'create_time': {type: Number, default: Date.now}     
    }
}

for(let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel: function(name) {
        return mongoose.model(name)
    }
}

const express = require('express');
const userRouter = require('./user');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const model = require('./module');
const Chat = model.getModel('chat');

const path = require('path');

const server = require('http').Server(app);
const io = require('socket.io')(server);  //把http和websocket统一,把socket.io与express绑定
io.on('connection',function(socket){
	//console.log('user login')
	socket.on('sendMsg',function(data) {  //io是全局的请求，socket是当前连接的请求
		const { from, to, msg } = data;
		const chatid = [from,to].sort().join('_');
		Chat.create({chatid,from,to,content: msg},function(err,doc){
			io.emit('receiveMsg',Object.assign({},doc._doc));
		})
		//console.log(data);
		//io.emit('receiveMsg',data);    //把socket的事情广播到全局
	})
})

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)
app.use('/',express.static(path.resolve('build')))
server.listen(9093,function(){
	console.log('Node app start at port 9093')
})

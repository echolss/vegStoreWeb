//const express = require('express');
import express from 'express';
import userRouter from './user';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import csshook from 'css-modules-require-hook/preset';
import assethook from 'asset-require-hook';




import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { StaticRouter } from 'react-router-dom';
import reducer from '../src/redux/reducers/reducer';
import Home from '../src/Home';

import { renderToString } from 'react-dom/server';
//import { renderToNodeStream } from 'react-dom/server';
import staticPath from '../build/asset-manifest.json';


assethook({
    extensions: ['png'],
    mimetype: 'image/png',
    limit: 10000
});

/*
function LuoApp() {
	return (
	    <div>
			<h2>hello,world</h2>
			<p>server render</p>
		</div>
    );
}
*/

//<div data-reactroot=""><h2>hello,world</h2><p>server render</p></div>
//console.log(renderToString(<LuoApp/>))

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
app.use(function(req, res, next) {
	if(req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
		return next()
	}
	//console.log('path.resolve',path.resolve('build/index.html')) //path.resolve E:\react\reactgame\boss\build\index.html
	//return res.sendFile(path.resolve('build/index.html'))
	//const htmlRes = renderToString(<LuoApp/>);
	//res.send(htmlRes);
	const store = createStore(reducer,compose(applyMiddleware(thunk)))
	let context = {};
	const makup = renderToString(
		<Provider store={store}>
			<StaticRouter location={req.url} context={context}>
				<Home/>
			</StaticRouter>
		</Provider>
	);
	const pageHtml = `
	<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
				<meta name="theme-color" content="#000000">
				<link rel="stylesheet" href=${staticPath['main.css']}>
				<title>Boss直聘</title>
			</head>
			<body>
				<noscript>
				You need to enable JavaScript to run this app.
				</noscript>
				<div id="root">${makup}</div>

				<script src=${staticPath['main.js']}></script>
			</body>
		</html>
	`;
	res.send(pageHtml);
	/*
	res.write(`
	<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
				<meta name="theme-color" content="#000000">
				<meta name="description" content="招聘webApp">
		        <meta name="keywords" content="招聘,实时聊天,webApp">
				<link rel="stylesheet" href=${staticPath['main.css']}>
				<title>Boss直聘</title>
			</head>
			<body>
				<noscript>
				You need to enable JavaScript to run this app.
				</noscript>
				<div id="root">
	`);
	const makupStream = renderToNodeStream(
		<Provider store={store}>
			<StaticRouter location={req.url} context={context}>
				<Home/>
			</StaticRouter>
		</Provider>
	);
	makupStream.pipe(res, {end:false});
	makupStream.on('end', () => {
		res.write(`
		        </div>
				<script src=${staticPath['main.js']}></script>
			</body>
		</html>
		`);
		res.end();
	})
	*/
})
app.use('/',express.static(path.resolve('build')))
server.listen(9093,function(){
	console.log('Node app start at port 9093')
})

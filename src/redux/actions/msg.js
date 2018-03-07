import axios from 'axios';
import io from 'socket.io-client';

const socket = io('ws://localhost:9093');

//获取聊天列表
export function getMsgList() {
    return (dispatch,getState) => {   //getState 可以获取应用里面所有的状态
        axios.get('/user/getmsglist')
        .then(res=>{
            if(res.status===200 && res.data.code===0) {
                const userid = getState().user._id;
                dispatch(msgList(res.data.msgs,res.data.users,userid));
            }
        })
    }  
}

//信息列表
function msgList(msgs,users,userid) {
    return {
        type: 'Msg_List',
        payload: {msgs,users,userid}
    }
}

//发送信息
export function sendMsg({from, to, msg}) {
    return dispatch => {
        socket.emit('sendMsg',{from, to, msg});
    }
}
export function receiveMsg(to) {
    return (dispatch,getState) => {
        socket.on('receiveMsg',function(data){
            const myid = getState().user._id;
            dispatch(getMsg(data,myid));
        });
    }
}
export function disReceiveMsg() {
    return dispatch => {
        socket.on('receiveMsg',() => {});
    }
}
//读取信息
function getMsg(msg,myid) {
    return {
        type: 'Get_Msg',
        payload: msg,
        myid,
    }
}
//标识已读
function msgIsRead({from,to,num}) {
    return {
        type: 'Msg_isRead',
        payload: {from,to,num}
    }
}
export function readMsg(from) {
    return async (dispatch, getState) => {
        const res = await axios.post('/user/readmsg',{from})
        const to = getState().user._id;
        if (res.status===200 && res.data.code===0) {
            const num = res.data.num;
            dispatch(msgIsRead({from,to,num}))
        }
    }
}


/* 
发送消息发生在前端，接受消息发生在后端，所以
前端： 触发发送消息，监听接受消息
后端： 监听发送消息，出发接受消息
*/

//js写异步的阶段

/*
//1、回调函数 callback 易造成 callback hell
setTimeout(()=>{
    console.log('1')
},1000)
//代码嵌套层数越来越多，不可读,回调地狱
setTimeout(()=>{
    setTimeout(()=>{
        setTimeout(()=>{
            setTimeout(()=>{
                setTimeout(()=>{
                    console.log('1')
                },1000)
            },1000)
        },1000)
    },1000)
},1000)
*/

//2、promise

//先是：axios.post(...,success: function() {...})
/*后是：axios.post(...).then(res=>{
    return xx;
}).then(res=>{
    return axios.post
}).then(...)
一直.then还是不够好
*/

//3、async+await配合使用,await必须在async内部

/*
export function readMsg(from) {
    return (dispatch, getState) => {
        axios.post('/user/readmsg',{from})
          .then(res => {
              const to = getState().user._id;
              if (res.status===200 && res.data.code===0) {
                  const num = res.data.num;
                  dispatch(msgIsRead({from,to,num}))
              }
          })
    }
}

改写成:

export function readMsg(from) {
    return async (dispatch, getState) => {
        const res = await axios.post('/user/readmsg',{from})
        //还可以有多个res,依次发送
        //const res1 = await axios.post(...)
        const to = getState().user._id;
        if (res.status===200 && res.data.code===0) {
            const num = res.data.num;
            dispatch(msgIsRead({from,to,num}))
        }
    }
}
*/
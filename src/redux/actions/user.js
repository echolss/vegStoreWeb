import axios from 'axios';
//错误消息
function errorMsg(msg) {
    return {
        type: 'Error_Msg',
        msg
    }
}

//登录、注册、更新成功

function authSuccess(obj) {
    const { pwd, ...data} = obj;  //不把pwd传进reducer
    return {
        type: 'Auth_Success',
        payload: data
    }
}

// 注册

export function registerAsync({user,pwd,type}) {
    return dispatch => {
        axios.post('/user/register',{user,pwd,type})
           .then(res => {
               if(res.status===200 && res.data.code===0) {
                    dispatch(authSuccess({user,pwd,type}))
               }
               else {
                   dispatch(errorMsg(res.data.msg))
               }
           })
    }
    
}

//登录

export function loginAsync({user,pwd}) {
    return dispatch => {
        axios.post('/user/login',{user,pwd})
           .then(res => {
               if(res.status===200 && res.data.code===0) {
                    dispatch(authSuccess(res.data.data))  //返回数据中有type
               }
               else {
                   dispatch(errorMsg(res.data.msg))
               }
           })
    }
}

//cookie数据

export function dataAction(data) {
    return {
        type: 'Load_Data',
        payload: data
    }
}

//保存信息 

export function updateAsync(data) {
    return dispatch => {
        axios.post('/user/update',data)
           .then(res => {
               if(res.status===200 && res.data.code===0) {
                    dispatch(authSuccess(res.data.data))
               }
               else {
                   dispatch(errorMsg(res.data.msg))
               }
           })
    }
}

export const logoutAction = {
    type: 'Log_Out'
}

export const initAction = {
    type: 'Clear_Redux'
}
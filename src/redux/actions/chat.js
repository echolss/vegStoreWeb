import axios from 'axios';

//获取用户列表
export function getUserList(type) {
    return dispatch => {
        axios.get('user/list?type='+type)
        .then(res=>{
            if(res.status===200 && res.data.code===0) {
                dispatch(userList(res.data.data))
            }
        })
    }  
}

function userList(data) {
    return {
        type: 'User_List',
        payload: data
    }
}

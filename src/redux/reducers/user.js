import { getRedirectPath } from '../../util';
const initState = {
    msg: '',
    user: '',
    type: ''
}


export function user(state=initState,action) {
    switch(action.type) {
        case 'Auth_Success' : 
            return {...state,msg: '',redirectTo: getRedirectPath(action.payload),...action.payload};  //msg: ''以防之前有报错信息 
        case 'Load_Data': 
            return {...state,...action.payload};
        case 'Error_Msg' : 
            return {...state,msg: action.msg,isAuth: false};
        case 'Log_Out' :
            return {...initState,redirectTo:'/login'};
        case 'Clear_Redux' :
            return initState;
        default : return state;
    }
}

//Auth_Success: login\register\update
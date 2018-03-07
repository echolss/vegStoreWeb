const initState = {
    chatmsg: [],
    unread: 0,
    users: {}
}

export function msgUser(state=initState,action) {
    switch(action.type) {
        case 'Msg_List' : return {
            ...state,
            chatmsg: action.payload.msgs,
            unread: action.payload.msgs.filter(v=>!v.read && v.to === action.payload.userid).length, 
            users: action.payload.users
        };
        case 'Get_Msg' :
           const { myid } = action;
           if(action.payload.to === myid || action.payload.from === myid ) {
            const n =  action.payload.to === myid ? 1 : 0;
            return {...state,chatmsg: [...state.chatmsg,action.payload], unread: state.unread+n};
           }
           return state;
        case 'Msg_isRead' : 
           return {...state,chatmsg: state.chatmsg.map(v => {
               if(v.from===action.payload.from && v.to===action.payload.to) {
                v.read = true;
               }
               return v;
           }),unread: state.unread-action.payload.num}
        // case 'Is_Read' : return {...state,userlist: action.payload};
        case 'Clear_Redux' :
            return initState;
        default : return state;
    }
}
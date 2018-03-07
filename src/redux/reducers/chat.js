const initState = {
    userlist: []
}

export function chatUser(state=initState,action) {
    switch(action.type) {
        case 'User_List' : return {...state,userlist: action.payload};
        case 'Clear_Redux' :
            return initState;
        default : return state;
    }
}
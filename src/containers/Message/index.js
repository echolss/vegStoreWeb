import React from 'react';
import { connect } from 'react-redux';
import { List, Badge } from 'antd-mobile';

@connect(state=>state)
class Message extends React.Component {
    getLast(arr) {
        return arr[arr.length-1];
    }
    render() {
        //按照聊天用户分组，根据chatid
        const Item = List.Item;
        const Brief = Item.Brief;
        const users = this.props.msgUser.users;
        const myid = this.props.user._id;
        const msgGroup = {};
        this.props.msgUser.chatmsg.forEach(v => {
            msgGroup[v.chatid] = msgGroup[v.chatid] || [];
            msgGroup[v.chatid].push(v);
        });
        //console.log('msgGroup',msgGroup)                                //msgGroup: {id1: [..],id2: [..],id3: [..], ...}
        //console.log(Object.values({name: 'shasha', age: 18}))           //["shasha", 18]
        const chatList = Object.values(msgGroup).sort((a,b) => {
            const a_last = this.getLast(a).create_time;
            const b_last = this.getLast(b).create_time;            
            return b_last - a_last;    
        });     //chatList: [ [...], [...], [...], ...]                     
        return (
            <div>
                    {
                        chatList.map(
                            v => {
                                const lastItem = this.getLast(v);
                                const herid = lastItem.from === myid ? lastItem.to : lastItem.from;
                                const unread = v.filter(v=>!v.read&&v.to===myid).length;
                                return (
                                    <List key={lastItem._id}>
                                        <Item thumb={require(`../../components/img/${users[herid].avatar}.png`)} 
                                        extra={<Badge text={unread}/>}
                                        arrow="horizontal"
                                        onClick={()=>{this.props.history.push(`/chat/${herid}`)}}
                                        >
                                            {users[herid].name}
                                            <Brief>{lastItem.content}</Brief>
                                        </Item>
                                    </List>
                                )
                            }
                        )
                    }
            </div>
        );
    }
}

export default Message

/*
const arr = [
    {id: 0,text: '0'},
    {id: 0,text: '1'},
    {id: 1,text: '2'},
    {id: 2,text: '3'},
    {id: 2,text: '4'},
    {id: 2,text: '5'},
    {id: 4,text: '6'},
    {id: 3,text: '7'},
    {id: 3,text: '8'},
];
const obj = {};
arr.forEach(v => {
    obj[v.id] = obj[v.id] || [];
    obj[v.id].push(v);
})
console.log('obj',obj)
*/

/*console.log([3,1,2,6,5].sort(function(a,b) {
    //return a-b;  //根据大小排序,升序
    return b-a;    //降序
}))
*/
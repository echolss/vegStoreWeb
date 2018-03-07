import React from 'react';
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile';
import { connect } from 'react-redux';
import Bubbly from '../../components/Bubbly';
import { getMsgList, receiveMsg, sendMsg, readMsg } from '../../redux/actions/msg';
import { getChatid } from '../../util';
import QueueAnim from 'rc-queue-anim';

//bug: 退出再登录会造成两次渲染
@connect(mapStateToProps)
class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            text: '',
            showEmoji: false
        };
    }
    componentDidMount() {
        if(!this.props.chatmsg.length) {
            this.props.dispatch(getMsgList());
            this.props.dispatch(receiveMsg());
        }
    }
    componentWillUnmount() { //组件将被移除或被隐藏的时候触发，在react-router4里认为路由也是一个组件
        const from = this.props.match.params.user;
        this.props.dispatch(readMsg(from)); //which they send to me can be readed.
    }
    /*shouldComponentUpdate(nextProps) {
        if(nextProps.chatmsg === this.props.chatmsg) {
            return false;
        }
        return true;
    }*/
    fixCarousel() {
        setTimeout(function(){
            window.dispatchEvent(new Event('resize'))
        },0)           
    }
    handleEmoji() {
        this.setState({showEmoji: !this.state.showEmoji});
        this.fixCarousel();
    }
    handleClick(elm) {
        this.setState({text: this.state.text+elm.text});
    }
    handleSubmit() {
        const from = this.props.user._id;
        const to = this.props.match.params.user;
        const msg = this.state.text;
        this.props.dispatch(sendMsg({from,to,msg}));
        this.setState({text: ''});
    }
    render() {
        const { chatmsg } = this.props;
        const userid = this.props.match.params.user;
        const myid = this.props.user._id;
        const users = this.props.users;
        const Item = List.Item;
        const Mychatmsg = chatmsg.filter(v => getChatid(myid,userid)===v.chatid);
        const emojiList = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 ';
        const dataList = emojiList.split(' ').filter(v=>v).map(v=>({text:v})); //filter(v=>v)过滤，防止中间两个空格

        if(!users[userid]) {
            return null;
        }
        return (
           <div id="chat-page">
               <NavBar 
                    mode="dark" 
                    icon={<Icon type="left" />} 
                    onLeftClick={() => this.props.history.goBack()}
                >{users[userid].name}</NavBar>
               <div className="stick-body">
                    <QueueAnim delay={100} type="scale">
                        {
                            Mychatmsg.map(
                                v => {
                                    const avatar = require(`../../components/img/${users[v.from].avatar}.png`)
                                    return v.from === userid 
                                    ? (
                                    <List key={v._id}>
                                        <Item thumb={avatar}><Bubbly content={v.content} triangle="left"/></Item>
                                    </List>
                                    ) 
                                    : (
                                    <List key={v._id}>
                                        <Item className="chat-me" extra={<img src={avatar} alt={users[v.from].avatar}/>}><Bubbly content={v.content} triangle="right"/></Item>
                                    </List>
                                    )
                                }
                            )
                        }
                    </QueueAnim>
                </div>
                <div className="stick-footer">
                    <List>
                        <InputItem 
                        placeholder="请输入" 
                        value={this.state.text} 
                        onChange={v=>{this.setState({text: v})}}
                        extra={
                            <div>
                                <img 
                                style={{marginRight:15}} 
                                onClick={()=>{this.handleEmoji()}} 
                                alt="emoji"
                                src={require('./emoji.png')}
                                className="emojiImg"
                                />
                                <span onClick={()=>{this.handleSubmit()}}>发送</span>
                            </div>
                        }
                        ></InputItem>
                    </List>
                    {
                        this.state.showEmoji && 
                        <Grid data={dataList} columnNum={9} carouselMaxRow={4} isCarousel={true} onClick={elm => this.handleClick(elm)} />
                    }
                </div>
            </div>
        );
    }
}

export default Chat

function mapStateToProps(state) {
    return {
        user: state.user,
        chatmsg: state.msgUser.chatmsg,
        unread: state.msgUser.unread,
        users: state.msgUser.users
    }
}
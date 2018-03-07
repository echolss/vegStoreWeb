import React from 'react';
import { NavBar } from 'antd-mobile';
import Boss from '../Boss';
import Worker from '../Worker';
import { connect } from 'react-redux';
import Message from '../Message';
import User from '../User';
import TabLinkBar from '../../components/TabLinkBar';
import { Route, Redirect } from 'react-router-dom';
import { getMsgList, receiveMsg } from '../../redux/actions/msg';
// import QueueAnim from 'rc-queue-anim';
//import PropTypes from 'prop-types';


@connect(mapStateToProps)
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}; 
    }
    componentDidMount() {
        if(!this.props.chatmsg.length) {
            this.props.dispatch(getMsgList());
            this.props.dispatch(receiveMsg());
        }
    }
    // componentWillUnmount() {
    //     this.props.dispatch(disReceiveMsg());
    // }
    handleClick(elm) {
        this.setState(elm);   
        this.props.selectAvatar(elm.text);
    }
    render() {
        const pathname = this.props.location.pathname;
        const { user } = this.props;
        const navList = [
            {
                path: '/boss',
                text: '牛人',
                icon: 'boss',
                title: '牛人列表',
                component: Boss,
                hide: user.type==='worker'
            },
            {
                path: '/worker',
                text: '职位',
                icon: 'job',
                title: '职位列表',
                component: Worker,
                hide: user.type==='boss'
            },
            {
                path: '/message',
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: Message
            },
            {
                path: '/me',
                text: '我',
                icon: 'user',
                title: '个人中心',
                component: User
            }
        ];

        const page = navList.find(v=>v.path===pathname);
        return page  ? (
            <div>
                <NavBar mode="dard" className="fixed-header">{page.title}</NavBar>
                <div className="fixed-body">
                {/* <QueueAnim duration={800} type="scaleX"> */}
                    <Route path={page.path} component={page.component} key={page.path}/>
                {/* </QueueAnim> */}
                </div>
                <TabLinkBar navList={navList} />
            </div>
        ) : (<Redirect to="/message"></Redirect>);
    }
}

export default Dashboard

function mapStateToProps(state) {
    return {
        user: state.user,
        msg: state.user.msg,
        redirectTo: state.user.redirectTo,
        unread: state.msgUser.unread,
        chatmsg: state.msgUser.chatmsg
    }
}
/*
Array.find:   查找元素，返回找到的值，找不到返回undefined

var ret1 = arr1.find(
    (value, index, arr) => { return value > 4 }
)                                                 //undefined

*/

/*

// 让动画生效，只渲染一个Route，根据当前的path决定组件
const page = navList.find(v=>v.path=pathname);
return (
    <div>
        <NavBar mode="dard" className="fixed-header">{navList.find(v => v.path===pathname).title}</NavBar>
        <div className="fixed-body">
        <QueueAnim duration={800} type="scaleX">
            <Route path={page.path} component={page.component} key={page.path}/>
        </QueueAnim>
        </div>
        <TabLinkBar navList={navList} />
    </div>
);

return (
    <div id="dashboard">
        <NavBar mode="dard" className="fixed-header">{navList.find(v => v.path===pathname).title}</NavBar>
        <div className="fixed-body">
            <Switch>
                {
                    navList.map(
                        v => (
                            <Route path={v.path} component={v.component} key={v.path}/>
                        )
                    )
                }
            </Switch>
        </div>
        <TabLinkBar navList={navList} />
    </div>
);
*/
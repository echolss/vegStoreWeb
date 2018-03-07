//有 求Boss们、个人中心、消息列表几个页面

import React from 'react';
import { getUserList } from '../../redux/actions/chat';
import { connect } from 'react-redux';
import UserCard from '../../components/UserCard';

@connect(mapStateToProps)
class Worker extends React.Component {
    componentDidMount() {
        this.props.dispatch(getUserList('boss'));
    }
    render() {
        const user = this.props.user;
        return user ? (<UserCard userList={this.props.userList}/>) : null;
    }
}

export default Worker

function mapStateToProps(state) {
    return {
        userList: state.chatUser.userlist,
        user: state.user.user
    }
}
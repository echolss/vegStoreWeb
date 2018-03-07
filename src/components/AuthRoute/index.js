import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { dataAction } from '../../redux/actions/user';
import { connect } from 'react-redux';

//获取用户信息，并做简单跳转
@withRouter
@connect()
class AuthRoute extends React.Component {
    componentDidMount() {
        //获取用户信息   1、是否登录  2、现在的URL地址  3、在login页面是不需要跳转的 4、用户的身份 5、用户是否完善信息（选择头像、个人简介）
        const publicList = ['/login','/register'];
        const pathname = this.props.location.pathname;
        if(publicList.indexOf(pathname) > -1 ) {
            return null;
        }
        axios.get('/user/info')
            .then(res => {
                if(res.status===200) {
                    if(res.data.code===0) {
                        this.props.dispatch(dataAction(res.data.data))
                    }
                    else {
                        this.props.history.push('/login')
                    }
                }
            })
    }
    render() {
        return null
    }
}

export default AuthRoute


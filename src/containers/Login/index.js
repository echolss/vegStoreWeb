import React from 'react';
import Logo from '../../components/Logo';
import { List, InputItem, WingBlank, WhiteSpace, Button, Toast } from 'antd-mobile';
import { loginAsync, initAction } from '../../redux/actions/user';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import HOCform from '../../components/HOCform';

@connect(mapStateToProps)
@HOCform
class Login extends React.Component {
    // constructor(props) {
    //     super(props);
    //     // this.state = {
    //     //     redirectTo: '',  //跳转到哪儿去
    //     //     user: '',
    //     //     pwd: ''
    //     // }
    // }
    componentDidMount() {
        this.props.dispatch(initAction);
    }
    handleClick = () => {
        const { user, pwd } = this.props.state;
        if(!user || !pwd) {
            Toast.info('用户和密码必须输入', 2, null, false);
        }
        else {
            this.props.dispatch(loginAsync(this.props.state));
        }
    }
    handleRegister = () => {
        this.props.history.push('/register')
    }
    render() {
        const { msg, redirectTo } =this.props;
        return (
            <div>
                {redirectTo && redirectTo !=='/login' && <Redirect to={redirectTo}/>}
                <Logo/>
                <WingBlank>
                    <List>
                        <WingBlank>{msg && <p className="err-tip">{msg}</p>}</WingBlank>
                        <InputItem onChange={v => this.props.handleChange('user',v)}>用户</InputItem>
                        <WhiteSpace/>
                        <InputItem onChange={v => this.props.handleChange('pwd',v)}>密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.handleClick}>登录</Button>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.handleRegister}>注册</Button>
                </WingBlank>
            </div>
        );
    }
}

export default Login

function mapStateToProps(state) {
    return {
        user: state.user,
        msg: state.user.msg,
        redirectTo: state.user.redirectTo
    }
}
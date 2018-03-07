import React from 'react';
import Logo from '../../components/Logo';
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio, Toast } from 'antd-mobile';
import { connect } from 'react-redux';
import { registerAsync } from '../../redux/actions/user';
import { Redirect } from 'react-router-dom';
import HOCform from '../../components/HOCform';

const RadioItem = Radio.RadioItem;

@connect(mapStateToProps)
@HOCform
class Register extends React.Component {
    /*constructor(props) {
        super(props);
        this.state = {
            redirectTo: '',  //跳转到哪儿去
            user: '',
            pwd: '',
            repeatPwd: '',
            type: 'boss'  //or worker
        }
    }
    */
    componentDidMount() {
        this.props.handleChange('type','worker');
    }
    handleClick = () => {
        const { user, pwd, repeatPwd } = this.props.state;
        if(!user || !pwd || !repeatPwd) {
            Toast.info('用户和密码必须输入', 2, null, false);
        }
        else if(pwd!==repeatPwd) {
            Toast.info('重复密码和密码必须相同', 2, null, false);
        }
        else {
            this.props.dispatch(registerAsync(this.props.state));
        }
    }
    render() {
        const { msg, redirectTo } =this.props;
        
        return (
            <div>
                {redirectTo && <Redirect to={redirectTo}/>}
                <Logo/>
                <WingBlank>
                    <List>
                        <WingBlank>{msg && <p className="err-tip">{msg}</p>}</WingBlank>
                        <InputItem onChange={v => this.props.handleChange('user',v)}>用户</InputItem>
                        <WhiteSpace/>
                        <InputItem onChange={v => this.props.handleChange('pwd',v)}>密码</InputItem>
                        <WhiteSpace/>
                        <InputItem onChange={v => this.props.handleChange('repeatPwd',v)}>确认密码</InputItem>
                        <WhiteSpace/>
                        <RadioItem onChange={() => this.props.handleChange('type','boss')} 
                            checked={this.props.state.type==='boss'}>招贤人</RadioItem>
                        <WhiteSpace/>
                        <RadioItem onChange={() => this.props.handleChange('type','worker')} 
                            checked={this.props.state.type==='worker'}>找工作</RadioItem>
                    </List>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.handleClick}>注册</Button>
                </WingBlank>
            </div>
        );
    }
}

export default Register

function mapStateToProps(state) {
    return {
        user: state.user,
        msg: state.user.msg,
        redirectTo: state.user.redirectTo
    }
}

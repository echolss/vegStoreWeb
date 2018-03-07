import React from 'react';
import { List, InputItem, WhiteSpace, Button, NavBar, TextareaItem, WingBlank } from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AvatarSelector from '../../components/AvatarSelector';
import { updateAsync } from '../../redux/actions/user';

@connect(mapStateToProps)
class BossInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: '',
            job: '',
            company: '',
            money: '',
            desc: ''
        }
    }
    handleChange(key,val) {
        this.setState({
            [key]: val
        });
    }
    selectAvatar = (imgName) => {
        this.setState({
            avatar: imgName
        })
    }
    handleClick = () => {
        this.props.dispatch(updateAsync(this.state));
    }
    render() {
        const { msg, redirectTo } =this.props;
        const path = this.props.location.pathname;
        return (
            <div>
                {redirectTo && path !== redirectTo && <Redirect to={redirectTo}/>}
                <NavBar mode="dark">请完善你的信息</NavBar>
                <AvatarSelector selectAvatar={this.selectAvatar}/>
                <WhiteSpace/>
                    <List>
                        <WingBlank>{msg && <p className="err-tip">{msg}</p>}</WingBlank>
                        <InputItem onChange={v => this.handleChange('job',v)}>招聘职位</InputItem>
                        <WhiteSpace/>
                        <InputItem onChange={v => this.handleChange('company',v)}>公司名称</InputItem>
                        <WhiteSpace/>
                        <InputItem onChange={v => this.handleChange('money',v)}>职位薪资</InputItem>
                        <WhiteSpace/>
                        <TextareaItem
                            title="职位要求"
                            rows={3}
                            onChange={v => this.handleChange('desc',v)}
                            autoHeight
                        />
                        <WhiteSpace/>
                    </List>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.handleClick}>保存</Button>
            </div>
        );
    }
}

export default BossInfo
function mapStateToProps(state) {
    return {
        user: state.user,
        msg: state.user.msg,
        redirectTo: state.user.redirectTo
    }
}
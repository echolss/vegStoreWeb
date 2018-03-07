import React from 'react';
import { List, InputItem, WhiteSpace, Button, NavBar, TextareaItem, WingBlank } from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AvatarSelector from '../../components/AvatarSelector';
import { updateAsync } from '../../redux/actions/user';

@connect(mapStateToProps)
class WorkerInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: '',
            job: '',
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
                        <InputItem onChange={v => this.handleChange('job',v)}>求职岗位</InputItem>
                        <WhiteSpace/>
                        <TextareaItem
                            title="个人简介"
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

export default WorkerInfo

function mapStateToProps(state) {
    return {
        user: state.user,
        msg: state.user.msg,
        redirectTo: state.user.redirectTo
    }
}
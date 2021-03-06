import React from 'react';
import { connect } from 'react-redux';
import { Result, List, WhiteSpace, Modal } from 'antd-mobile';
import browserCookie from 'browser-cookies';
import { logoutAction } from '../../redux/actions/user';
import { Redirect } from 'react-router-dom';


const Item = List.Item;
const Brief = Item.Brief;
const alert = Modal.alert;

@connect(state=>state.user)
class User extends React.Component {
    logout = () => {
         alert('注销', '确认退出登录吗？？？', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确认', onPress: () => {
                    browserCookie.erase('userid');
					this.props.dispatch(logoutAction);
					// this.props.history;
                } 
            },
          ]);
	}
    render(){
		const props = this.props;
		return props.user ? (
			<div>
				<Result
					img={<img src={require(`../../components/img/${props.avatar}.png`)} style={{width:50}} alt="" />}
					title={props.user}
					message={props.type==='boss'?props.company:null}
				/>
				
				<List renderHeader={()=>'简介'}>
					<Item
						multipleLine
					>
						{props.title}
						{props.desc.split('\n').map(v=><Brief key={v}>{v}</Brief>)}
						{props.money?<Brief>薪资:{props.money}</Brief>:null}
					</Item>
					
				</List>
				<WhiteSpace></WhiteSpace>
				<List>
					<Item onClick={this.logout}>退出登录</Item>
				</List>
			</div>
		):(props.redirectTo ? <Redirect to={props.redirectTo} /> : null)

	}
}

export default User
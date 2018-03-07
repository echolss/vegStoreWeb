import React from 'react';
import PropTypes from 'prop-types';
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

@withRouter
@connect(
	state=>state.msgUser
)
class TabLinkBar extends React.Component {
    render() {
        const { pathname } = this.props.location;
        const navList = this.props.navList.filter( v => !v.hide );  //过滤掉hide为true的
        return (
            <TabBar>
                {
                    navList.map(
                        v => (
                            <TabBar.Item
                            badge={v.path==='/message' ? this.props.unread: 0}
                            title={v.text}
                            key={v.text}
                            icon={{uri: require(`./img/${v.icon}.png`)}}
                            selectedIcon={{uri: require(`./img/${v.icon}-active.png`)}}
                            selected={pathname===v.path}
                            onPress={() => {this.props.history.push(v.path)}}
                            >
                            </TabBar.Item>
                        )
                    )
                }
            </TabBar>
        );
    }
}

export default TabLinkBar

TabLinkBar.propTypes = {
    navList: PropTypes.array.isRequired
}
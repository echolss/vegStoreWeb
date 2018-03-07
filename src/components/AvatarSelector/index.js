import React from 'react';
import { Grid, List } from 'antd-mobile';
import PropTypes from 'prop-types';

class AvatarSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};  //最开始没有elm
    }
    handleClick(elm) {
        this.setState(elm);   //{icon: xxx, text: xxx}
        this.props.selectAvatar(elm.text);
    }
    render() {
        const avatarList = ['boy','girl','man','woman','bull','chick','crab','hedgehog','tiger','koala','lemur','pig','hippopotamus','whale','zebra'];
        const dataList = avatarList.map( v=> ({
            icon: require(`../img/${v}.png`),
            text: v
        }))
        const gridHeader = (
            this.state.text 
               ? 
            <div><span>已选择头像</span><img src={this.state.icon} alt={this.state.text}/></div>
               :
            <div>请选择头像</div> 
        );
        return (
            <List renderHeader={gridHeader}>
                <Grid data={dataList} columnNum={5} onClick={elm => this.handleClick(elm)}/>
            </List>
        );
    }
}

export default AvatarSelector

AvatarSelector.propTypes = {
    selectAvatar: PropTypes.func.isRequired
}
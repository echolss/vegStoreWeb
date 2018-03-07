import React from 'react';
import { Card, WhiteSpace, WingBlank } from 'antd-mobile';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

@withRouter
class UserCard extends React.Component {
    handleClick(v) {
        this.props.history.push(`/chat/${v._id}`);
    }
    render() {
        return (
            <WingBlank>
            <WhiteSpace/>
                {
                    this.props.userList.map(
                        v => (
                                v.avatar &&
                                <Card key={v._id} onClick={()=>this.handleClick(v)}>
                                    <Card.Header
                                        title={v.user}
                                        thumb={require(`../img/${v.avatar}.png`)}
                                        extra={<span>{v.job}</span>}
                                    />
                                    <Card.Body>
                                        {
                                            v.type==='boss' && <div>公司： {v.company}</div>
                                        }
                                        <WhiteSpace/>
                                        {
                                            v.desc.split('\n').map(
                                                d => (<div key={d}>{d}</div>)
                                            )
                                        }
                                        <WhiteSpace/>
                                        {
                                            v.type==='boss' && <div>薪资： {v.money}</div>
                                        }
                                    </Card.Body>
                                    
                                    {/* <Card.Footer content="footer content" extra={<div>extra footer content</div>} /> */}
                                </Card>

                        )
                    )
                }
            </WingBlank>
        );
    }
}

export default UserCard

UserCard.propTypes = {
    userList: PropTypes.array.isRequired
}
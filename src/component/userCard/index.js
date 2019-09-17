import React from 'react'
import PropTypes from 'prop-types';
import { Card,WingBlank } from 'antd-mobile'

class UserCard extends React.Component{
    static propTypes = {
        userList: PropTypes.array.isRequired
    };
    render() {
        return(
            <WingBlank>
                {
                    this.props.userList.map(v=>(
                        v.avatar?
                            <Card key={v.user}>
                                <Card.Header title={v.user} thumb={require(`../img/${v.avatar}.png`)} extra={<span>{v.title}</span>}>
                                </Card.Header>
                                <Card.Body>
                                    {v.type==='boss'?<div style={{paddingLeft:20}}>公司：{v.company}</div>:null}
                                    {v.desc.split('\n').map(d=>(
                                    <div style={{paddingLeft:20}} key={d}>{d}</div>))}
                                    {v.type==='boss'?<div style={{paddingLeft:20}}>薪资：{v.money}</div>:null}
                                </Card.Body>
                            </Card>:null
                    ))
                }
            </WingBlank>
        )
    }
}
export default UserCard

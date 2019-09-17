import React from 'react'
import { connect } from 'react-redux'
import { Result,List,WhiteSpace,Modal }from 'antd-mobile'
import browserCookies from 'browser-cookies';

@connect(
    stats=>stats.user
)
class User extends React.Component{
    logOut(){
        const alert = Modal.alert;
        alert('注销','确认退出吗？？？', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确认', onPress: () => {
                browserCookies.erase('userid');
                window.location.reload();
            } },
        ])
    }
    render(){
        const Item = List.Item;
        const Brief = List.Item.Brief;
        return this.props.user?(
            <div>
                <Result
                    img={<img width={50} src={require(`../img/${this.props.avatar}.png`)} alt=""/>}
                    title={ <p>{this.props.user}</p>}
                    message={this.props.type==='boss'?<div>{this.props.company}</div>:null}
                />
                <List renderHeader={() => '简介'}>
                    <Item wrap={true}>
                        {this.props.title}
                        {this.props.desc.split('\n').map(v=><Brief key={v}>{v}</Brief>)}
                        {
                            this.props.money?<Brief>{this.props.money}</Brief>:null
                        }
                    </Item>
                </List>
                <WhiteSpace>
                </WhiteSpace>
                <List>
                    <Item onClick={this.logOut.bind(this)}>退出登录</Item>
                </List>
            </div>
        ):null
    }
}
export default User

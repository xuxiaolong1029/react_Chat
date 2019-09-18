import React from 'react'
import { connect } from 'react-redux'
import { Result,List,WhiteSpace,Modal }from 'antd-mobile'
import cookies from 'browser-cookies';
import { logoutSubmit } from '../../redux/user.redux'
import { Redirect } from  'react-router-dom'
@connect(
    stats=>stats.user,
    {logoutSubmit}
)
class User extends React.Component{
    logOut(){
        const alert = Modal.alert;
        alert('注销','确认退出吗？？？', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确认', onPress: () => {
                cookies.erase('userid');
                this.props.logoutSubmit();
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
                <WhiteSpace/>
                <List>
                    <Item onClick={this.logOut.bind(this)}>退出登录</Item>
                </List>
            </div>
        ):<Redirect to={this.props.redirecTo} />
    }
}
export default User

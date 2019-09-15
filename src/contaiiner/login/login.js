import React from 'React'
import {connect} from 'react-redux'
import Logo from  '../../component/logo/logo';
import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile';
import { login } from '../../redux/user.redux'
@connect(
    state=>state.user,
    {login}
)
class LoginPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user:'xuxiaolong',
            pwd:'1029',
        }
    }
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    register(){
        this.props.history.push('/register')
    }
    handleLogin(){
        this.props.login(this.state)
    }
    render(){
        return (
            <div>
                <Logo></Logo>
                <h2>我是登录页面</h2>
                <WingBlank>
                    <List>
                        <InputItem value={this.state.user} onChange={this.handleChange.bind(this,'user')}>用户名</InputItem>
                        <WhiteSpace/>
                        <InputItem value={this.state.pwd} onChange={this.handleChange.bind(this,'pwd')}>密码</InputItem>
                    </List>
                    <Button onClick={this.handleLogin.bind(this)} type='primary'>登录</Button>
                    <WhiteSpace/>
                    <Button onClick={this.register.bind(this)} type='primary'>注册</Button>
                </WingBlank>
            </div>
        )
    }
}
export default LoginPage

import React from 'React'
import Logo from  '../../component/logo/logo';
import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.register = this.register.bind(this);
        this.Login = this.Login.bind(this);
    }
    register(){
        this.props.history.push('/register')
    }
    Login(){

    }
    render(){
        return (
            <div>
                <Logo></Logo>
                <WingBlank>
                    <Button onClick={this.Login} type='primary'>登录</Button>
                    <WhiteSpace/>
                    <Button onClick={this.register} type='primary'>注册</Button>
                </WingBlank>
            </div>
        )
    }
}
export default Login

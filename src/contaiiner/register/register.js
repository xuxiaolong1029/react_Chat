import React from 'React'
import Logo from  '../../component/logo/logo'
import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile'

class Register extends React.Component{
    constructor(props){
        super(props);
        this.register = this.register.bind(this)
    }
    register(){

    }
    render(){
        return (
            <div>
                <Logo></Logo>
                <WingBlank>
                    <Button onClick={this.register} type='primary'>注册</Button>
                </WingBlank>
            </div>
        )
    }
}
export default Register

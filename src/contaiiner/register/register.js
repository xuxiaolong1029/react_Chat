import React from 'React'
import Logo from  '../../component/logo/logo'
import {List,InputItem,Radio,WingBlank,WhiteSpace,Button} from 'antd-mobile'

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
           user:'sfsf',
           pwd:'',
           confirmPwd:'',
           type:'genius'//或者boss
        }
        this.handleRegister = this.handleRegister.bind(this)
    }
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    handleRegister(){
        console.log(this.state)
    }
    render(){
        const RadioItem = Radio.RadioItem
        return (
            <div>
                <Logo></Logo>
                <List>
                    <InputItem value={this.state.user} onChange={this.handleChange.bind(this,'user')}>用户名</InputItem>
                    <WhiteSpace/>
                    <InputItem type='password' value={this.state.pwd} onChange={this.handleChange.bind(this,'pwd')}>密码</InputItem>
                    <WhiteSpace/>
                    <InputItem type='password' value={this.state.confirmPwd} onChange={this.handleChange.bind(this,'confirmPwd')}>确认密码</InputItem>
                    <WhiteSpace/>
                    <RadioItem checked={this.state.type==='genius'}
                    onChange ={()=>this.handleChange('type','genius')}
                    >
                        牛人
                    </RadioItem>
                    <RadioItem checked={this.state.type==='boss'}
                    onChange ={()=>this.handleChange('type','boss')}>
                        Boss
                    </RadioItem>
                </List>
                <WingBlank>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.handleRegister}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}
export default Register

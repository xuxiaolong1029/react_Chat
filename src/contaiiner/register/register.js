import React from 'React'
import {Redirect} from 'react-router-dom'
import Logo from  '../../component/logo/logo'
import {List,InputItem,Radio,WingBlank,WhiteSpace,Button} from 'antd-mobile'
import {connect} from 'react-redux'
import { register } from '../../redux/user.redux'
import '../public.css'
@connect(
    state=>state.user,
    {register}

)
class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
           user:'xuxiaolong',
           pwd:'1029',
           confirmPwd:'1029',
           type:'genius'//或者boss
        }
    }
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    handleRegister(){
        this.props.register(this.state)
    }
    render(){
        const RadioItem = Radio.RadioItem
        //console.log(this.props)
        return (
            <div>
                {this.props.redirecTo?<Redirect to={this.props.redirecTo}/>:null}
                <Logo></Logo>
                {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
                <List>
                    <InputItem value={this.state.user} onChange={this.handleChange.bind(this,'user')}>用户名</InputItem>
                    <WhiteSpace/>
                    <InputItem type='password' value={this.state.pwd} 
                    onChange={this.handleChange.bind(this,'pwd')}
                    >密码</InputItem>
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
                    <Button type='primary' onClick={this.handleRegister.bind(this)}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}
export default Register

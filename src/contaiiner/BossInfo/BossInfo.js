import React from 'react';
import {NavBar,InputItem,WhiteSpace,TextareaItem,Button} from 'antd-mobile'
import Avatar from  '../../component/avatar/avatar';
import {connect} from 'react-redux';
import {updata} from '../../redux/user.redux';
import {Redirect} from 'react-router-dom'
@connect(
    state=>state.user,
    {updata}
)
class BossInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            avatar:'whale',
            title:'前端工程师',
            company:'',
            money:'',
            desc:''
        }
    }
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    handleSave(){
        this.props.updata(this.state)
    }
    render(){
        const path = this.props.location.pathname;
        const redirect = this.props.redirecTo;
        return(
            <div>
                {redirect&&redirect!==path?<Redirect to={redirect} />:null}
                <NavBar mode='dark'>boss信息完善</NavBar>
                <Avatar selectAvatar={(icon)=>{
                     this.setState({ avatar:icon }) }}></Avatar>
                <InputItem value={this.state.title} onChange={this.handleChange.bind(this,'title')}>招聘职位</InputItem>
                <InputItem value={this.state.company} onChange={this.handleChange.bind(this,'company')}>公司名称</InputItem>
                <InputItem value={this.state.money} onChange={this.handleChange.bind(this,'money')}>职位薪资</InputItem>
                <TextareaItem value={this.state.desc} rows={3} autoHeight title='职位要求'
                    onChange={this.handleChange.bind(this,'desc')}>
                </TextareaItem>
                <WhiteSpace/>
                <Button onClick={this.handleSave.bind(this)} type='primary'>保存</Button>
            </div>
        )
    }
}
export default BossInfo
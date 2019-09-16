import React from 'react';
import {connect} from 'react-redux';
import {NavBar,InputItem,WhiteSpace,TextareaItem,Button} from 'antd-mobile'
import {updata} from '../../redux/user.redux';
import {Redirect} from 'react-router-dom';
import Avatar from  '../../component/avatar/avatar';

@connect(
    state=>state.user,
    {updata}
)
class GeniusInfo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            avatar:'whale',
            title:'前端工程师',
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
        return (
            <div>
                {redirect&&redirect!==path?<Redirect to={redirect} />:null}
                <NavBar mode='dark'>牛人信息完善</NavBar>
                <Avatar selectAvatar={(icon)=>{
                     this.setState({ avatar:icon }) }}></Avatar>
                <InputItem value={this.state.title} onChange={this.handleChange.bind(this,'title')}>求职岗位</InputItem>
                <TextareaItem value={this.state.desc} rows={3} autoHeight title='个人介绍'
                    onChange={this.handleChange.bind(this,'desc')}>
                </TextareaItem>
                <WhiteSpace/>
                <Button onClick={this.handleSave.bind(this)} type='primary'>保存</Button>
            </div>
        )
    }
}
export default GeniusInfo
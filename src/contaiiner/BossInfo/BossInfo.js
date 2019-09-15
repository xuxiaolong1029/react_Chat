import React from 'react';
import {NavBar,InputItem,WhiteSpace,TextareaItem,Button} from 'antd-mobile'
import Avatar from  '../../component/avatar/avatar';
import {connect} from 'react-redux';
import {update} from '../../redux/user.redux';

@connect(
    state=>state.user,
    {updata}
)
class BossInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            avatar:'',
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
    selectAvatar(icon){
        this.setState({
            avatar:icon
        })
    }
    handleSave(){
        console.log(this.state)
    }
    render(){
        return(
            <div>
                <NavBar mode='dark'>boss信息完善</NavBar>
                <Avatar selectAvatar={this.selectAvatar.bind(this,'avatar')}></Avatar>
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
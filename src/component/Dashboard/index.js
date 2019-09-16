import React from 'react';
import { connect } from "react-redux";
import {NavBar } from 'antd-mobile';
import NavListBar from "../navlink/index";
// TabBar, ListView,
@connect(
    state=>state
)

class Dashboard extends React.Component{
    constructor(props){
        super(props)
		this.state={}
    }
    render(){
        const pathname = this.props.location.pathname;
        const user = this.props.user;
        const navList = [
            {
                path:'/boss',text:'牛人',icon:'boss',
                title:'牛人列表',component:Boss,
                hide:user.type==='genius'
            },
            {
                path:'/genius',text:'boos',icon:'job',
                title:'Boss列表',component:Genius,
                hide:user.type==='boss'
            },
            {
                path:'/msg',text:'消息',icon:'msg',
                title:'消息列表',component:Msg
            },
            {
                path:'/me',text:'我',icon:'user',
                title:'个人中心',component:User
            },
        ]
        return(
            <div>
                <NavBar mode='dark'>{navList.find((v)=>v.path===pathname).title||''}</NavBar>

                <NavListBar data={navList}></NavListBar>
            </div>  
        )
    }
}

function Boss() {
    return <h2>boss页面</h2>
}
function Genius() {
    return <h2>牛人页面</h2>
}
function Msg() {
    return <h2>消息页面</h2>
}
function User() {
    return <h2>个人中心页面</h2>
}
export default Dashboard
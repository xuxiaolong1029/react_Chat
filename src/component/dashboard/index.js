import React from 'react';
import { connect } from "react-redux";
import {NavBar } from 'antd-mobile';
import NavListBar from "../navlink/index";
import {Switch,Route} from 'react-router-dom';
import User from '../center/index';
import Boss from '../boss/index';
import Genius from '../genius/index';
import Msg from '../message/index';
// TabBar, ListView,
@connect(
    state=>state
)

class Dashboard extends React.Component{
    constructor(props){
        super(props);
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
        ];
        return(
            <div>
                <NavBar mode='dark'>{navList.find((v)=>v.path===pathname).title||''}</NavBar>
                <div>
                    <Switch>
                        {
                            navList.map(v=>(
                                <Route key={v.path} path={v.path} component={v.component}></Route>
                            ))
                        }

                    </Switch>
                </div>
                <div className="footer">
                    <NavListBar data={navList}></NavListBar>
                </div>
            </div>
        )
    }
}
export default Dashboard

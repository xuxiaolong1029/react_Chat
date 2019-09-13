import React from 'react';
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import {login,getUserData} from './Auth.redux.js'

@connect(
    state => state.auth,
    {login,getUserData}
)

class Auth extends React.Component{
    componentDidMount(){
       this.props.getUserData()
    }
    render(){
        console.log(this.props)
        return(
            <div>
                <h2>名字:{this.props.user},年龄：{this.props.age}</h2>
                {this.props.isAuth?<Redirect to='/dashboard' />:null}
                <h2>你没有权限，需要登录</h2>
                <button onClick={this.props.login}>登录</button>
            </div>
        )
    }
}
export default Auth;
import React from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';
import Register from './contaiiner/register/register'
import LoginPage from './contaiiner/login/login';
import BossInfo from './contaiiner/BossInfo/BossInfo';
import GeniusInfo from './contaiiner/GeniusInfo/index';
import AuthRoute from './component/authroute/authroute';
import Dashboard from './component/dashboard/index';
import Chat from './component/chat/index'
class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hasError:false
        }
    }
    componentDidCatch(err,info){
        console.info(err,info)
        this.setState=(
            { hasError:true}
        )
    }
    render(){
        return this.state.hasError?<h2>页面出错了</h2>:
        (
            <div>
                <AuthRoute/>
                <Switch>
                    <Route path='/bossinfo' component={BossInfo }></Route>
                    <Route path='/geniusinfo' component={GeniusInfo}></Route>
                    <Route path='/login' component={LoginPage}></Route>
                    <Route path='/register' component={Register}></Route>
                    <Route path='/chat' component={Chat}></Route>
                    <Route component={Dashboard}></Route>
                    <Redirect exact path="" to='/login'></Redirect>
                </Switch>
            </div>
        )
    }
}
export default App
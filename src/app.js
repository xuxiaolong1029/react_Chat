import React from 'react';
import {Route,Switch} from 'react-router-dom';
import Register from './contaiiner/register/register'
import LoginPage from './contaiiner/login/login';
import BossInfo from './contaiiner/BossInfo/BossInfo';
import GeniusInfo from './contaiiner/GeniusInfo/index';
import AuthRoute from './component/authroute/authroute';
import Dashboard from './component/dashboard/index';
import Chat from './component/chat/index'
class App extends React.Component{
    render(){
        return(
            <div>
                <AuthRoute/>
                <Switch>
                    <Route path='/bossinfo' component={BossInfo}></Route>
                    <Route path='/geniusinfo' component={GeniusInfo}></Route>
                    <Route path='/login' component={LoginPage}></Route>
                    <Route path='/register' component={Register}></Route>
                    <Route path='/chat' component={Chat}></Route>
                    <Route component={Dashboard}></Route>
                </Switch>
            </div>
        )
    }
}
export default App
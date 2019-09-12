import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {BrowserRouter,Route,Link,Switch} from 'react-router-dom';
import './index.css';
import App from './App';
import{counter} from './index.redux';

//const reduxDevtools = window.devToolsExtension?window.devToolsExtension
const store = createStore(counter,compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
));
function sun(){
    return <h1>孙德胜</h1>
}
function er(props){
    console.info(props)
    return <h1>张大彪</h1>
}
class Test extends React.Component{
    render(){
        console.log(this.props.match.params.location)
        return <h1>测试{this.props.match.params.location}</h1>
    }
}
ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <ul>
                    <li>
                        <Link to='/'>独立团</Link>
                        <Link to='/er'>张大彪</Link>
                        <Link to='/sun'>孙德胜</Link>
                    </li>
                </ul>
            </div>
            <Switch>
                <Route path='/' exact component={App}></Route>
                <Route path='/er' component={er}></Route>
                <Route path='/sun' component={sun}></Route>
                <Route path='/:location' component={Test}></Route>
            </Switch>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
);
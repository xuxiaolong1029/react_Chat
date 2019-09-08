import React from 'react';
import logo from './logo.svg';
import './App.css';
import {createStore} from 'redux'

function App() {
  let boss = {
    boos0:'李云龙',
    boos1:'张大彪',
    boos2:'沈权'
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="title">
          欢迎来到react项目实践 {boss.boos0}
        </p>
        <Datt boos2={boss.boos2} boos1={boss.boos1}></Datt>
        <EXN boos2={boss.boos2} boos1={boss.boos1}></EXN>
      </header>
    </div>
  );
}
class Datt extends React.Component{
  render(){
    return (
      <div>
        <h2>一营营长{this.props.boos1}</h2>
        <h3>二营营长,{this.props.boos2}</h3>
      </div>
    )
  }
}
function EXN(props){                      
  return (
    <div>
      <h2>一营营长{props.boos1}</h2>
      <h3>二营营长{props.boos2}</h3>
    </div>
  )
}

export default App;

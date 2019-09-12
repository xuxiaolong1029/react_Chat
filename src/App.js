import React from 'react';
import {connect} from 'react-redux'
import {Button} from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css'
import './App.css';
import {addGun,removeGun,addGunAsyns,removeGunAsyns} from './index.redux'

@connect(
  //state什么属性放到props里
  state=>({num:state}),
  //你要什么方法，放到props里，自动dispatch
  {addGun,removeGun,addGunAsyns,removeGunAsyns}
)

class App extends React.Component{
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <p>{this.props.num}把</p>
          <Button type='primary' onClick={this.props.addGun}>加一把</Button>
          <Button type='primary' onClick={this.props.removeGun}>减一把</Button>
          <Button type='primary' onClick={this.props.addGunAsyns}>等2s</Button>
        </header>
      </div>
    );
  }
}

export default App;

/* class Datt extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      solders:[
        '虎子','柱子','王根生'
      ]
    }
  }
  componentWillMount(){
    console.log('组件马上就要加载了')
  }
  componentDidMount(){
    console.log('组件加载完毕')
  }
  addSolder(){
    this.setState({
      solders:[
        ...this.state.solders,
        '新宾蛋子'+Math.floor((Math.random()*10)+1)
      ]
    })
  }
  render(){
    console.log('组件正在加载')
    return (
      <div className="list">
        <h2>一营营长{this.props.boos1}</h2>
        <h3>二营营长,{this.props.boos2}</h3>
        <Button type='primary' onClick={()=>this.addSolder()}>加人</Button>
        <List renderHeader={() => '士兵列表'}>
          {this.state.solders.map(v=>{
            return <List.Item key={'ss'+v}>{v}</List.Item>
          })}
        </List>
      </div>
    )
  }
} */
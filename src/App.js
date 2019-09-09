import React from 'react';
import {Button,List} from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css'
import './App.css';


function App(props) {
  let boss = {
    boos0:'李云龙',
    boos1:'张大彪',
    boos2:'沈权'
  };
  const store = props.store;
  const num = store.getState();
  const addGun = props.addGun;
  const addGunAsyns = props.addGunAsyns;
  const removeGun = props.removeGun
  return (
    <div className="App">
      <header className="App-header">
        <p className="title">
          独立团团长：{boss.boos0}
        </p>
        <Datt boos2={boss.boos2} boos1={boss.boos1}></Datt>
        <p>{num}把</p>
        <Button type='primary' onClick={()=>store.dispatch(addGun())}>加一把</Button>
        <Button type='primary' onClick={()=>store.dispatch(removeGun())}>减一把</Button>
        <Button type='primary' onClick={()=>store.dispatch(addGunAsyns())}>等2s</Button>
      </header>
    </div>
  );
}
class Datt extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      solders:[
        '虎子','柱子','王根生'
      ]
    }
    //this.addSolder = this.addSolder.bind(this);
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
}

export default App;

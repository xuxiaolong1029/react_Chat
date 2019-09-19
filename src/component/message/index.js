import React from 'react'
import {List,InputItem} from 'antd-mobile'
import io from 'socket.io-client'
const socket = io('ws://localhost:9093');
//const socket = require('socket.io-client')('ws://localhost:9093');

class Msg extends React.Component{
    constructor(props){
        super(props);
        this.state={
            text:''
        };
    }
    componentDidMount(){

    }
    handelSubmit(){
        console.log(this.state.text);
        socket.emit('CHAT_SEND',{text:this.state.text});
        this.setState({
            text:''
        })
    }
    render(){
        const userName = this.props.location.search.split('=')[1];
        return(
            <div>
                <h2>chat with user:{ decodeURIComponent(userName)}</h2>
                <div className='stick-footer'>
                    <List>
                        <InputItem
                            placeholder="请输入"
                            value={this.state.text}
                            onChange={v=>{this.setState({text: v})}}
                            extra={<span onClick={() => this.handelSubmit()}>发送</span>}
                        />
                    </List>
                </div>
            </div>


        )
    }
}
export default Msg

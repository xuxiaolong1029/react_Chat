import React from 'react'
import {List,InputItem} from 'antd-mobile'
import { connect } from 'react-redux';
import io from 'socket.io-client'
//import { getMsgList } from  '../../redux/chat.redux'
@connect(
    state=>state
)

const socket = io('ws://localhost:9093');


class Msg extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            text:'',msg:[]
        };
    }
    componentDidMount(){
       // this.getMsgList
        socket.on('recvmsg',(data)=>{
            this.setState({
                msg:[...this.state.msg,data.text]
            });
        })
    }
    handelSubmit(){
        socket.emit('CHAT_SEND',{text:this.state.text});
        this.setState({
            text:''
        })
    }
    render(){
       // const userName = this.props.location.search.split('=')[1];
        return(
            <div>
                {
                    this.state.msg.map(v=>{
                        return <p key={v}>{v}</p>
                    })
                }
               {/* <h2>chat with user:{ decodeURIComponent(userName)}</h2>*/}
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

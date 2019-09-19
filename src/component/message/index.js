import React from 'react'
import {List,InputItem} from 'antd-mobile'
import { connect } from 'react-redux';
import {getMsgList,senMsg,recvMsg} from  '../../redux/chat.redux'

@connect(
    state=>state,
    { getMsgList,senMsg,recvMsg }
)
class Msg extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            text:'',msg:[]
        };
    }
    componentDidMount(){
       this.props.getMsgList();
       this.props.recvMsg();
    }
    handelSubmit(){
        let from = this.props.user._id;
        let to = this.props.location.search.split('=')[1];
        let msg = this.state.text;
        this.props.senMsg(from,to,msg);
        this.setState({
            text:''
        });
    }
    render(){
      /*  console.log(this.props.chat.chatmsg)*/
        return(
            <div id='chat-page'>
                {
                    this.props.chat.chatmsg.map(v=>{
                        return <p key={v._id}>{v.content}</p>
                    })
                }
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

import React from 'react'
import {List,InputItem,NavBar,Icon,Grid} from 'antd-mobile'
import { connect } from 'react-redux';
import {getMsgList,senMsg,recvMsg,readMsg} from  '../../redux/chat.redux';
import { getChatId }from '../../unit';
import QueueAnim from 'rc-queue-anim'
@connect(
    state=>state,
    { getMsgList,senMsg,recvMsg,readMsg }
)
class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            text:'',msg:[],showEmoji:false
        };
    }
    componentDidMount(){
        if(!this.props.chat.chatMsg.length){
            this.props.getMsgList();
            this.props.recvMsg();
        }
    }
    componentWillUnmount(){
        let to = this.props.location.search.split('=')[1];
        this.props.readMsg(to)
    }
    handelSubmit(v){
        let from = this.props.user._id;
        let to = this.props.location.search.split('=')[1];
        let msg = this.state.text;
        this.props.senMsg(from,to,msg);
        this.setState({
            text:''
        });
    }
    fixCarousel(){
        setTimeout(function () {
            window.dispatchEvent(new Event(('resize')))
        },0)
    }
    render(){
        const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍ 💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
            .split(' ')
            .filter(v=>v)
            .map(v=>({text:v}));
        const fromUserId = this.props.location.search.split('=')[1];
        const Item = List.Item;
        const users = this.props.chat.users;
        const chatId = getChatId(fromUserId,this.props.user._id);
        const chatMsg = this.props.chat.chatMsg.filter(v=>v.chatId === chatId);
        if(!users[fromUserId]){
            return  null
        }
        return(
            <div id='chat-page'>
                <NavBar
                    mode='dark'
                    icon = {<Icon type='left' />}
                    onLeftClick={()=>{
                        setTimeout(()=>{
                            this.props.history.goBack()
                        },200)
                    }}
                >{users[fromUserId].name}</NavBar>
                <QueueAnim type='left' delay={100}>
                    {
                        chatMsg.map(v=>{
                            const avatar = require(`../img/${users[v.from].avatar}.png`);
                            return v.from===fromUserId?(
                                <List key={v._id}>
                                    <Item thumb={avatar}>{v.content}</Item>
                                </List>
                            ):(
                                <List key={v._id}>
                                    <Item extra={<img src={avatar} alt=""/>} className='chat-me'>{v.content}</Item>
                                </List>
                            )
                        })
                    }
                </QueueAnim>
                <div className='stick-footer'>
                    <List>
                        <InputItem
                            placeholder="请输入"
                            value={this.state.text}
                            onChange={v=>{this.setState({text: v})}}
                            extra={
                                <div style={{height:20}}>
                                    <span role="img" aria-label='😀' style={{marginRight:10}}
                                        onClick={() =>{
                                            this.setState({ showEmoji:!this.state.showEmoji});
                                            this.fixCarousel()
                                        }}>😀</span>
                                    <span onClick={() => this.handelSubmit()}>发送</span>
                                </div>
                            }
                        />
                    </List>
                    {
                       this.state.showEmoji? <Grid
                            data = {emoji}
                            columnNum={9}
                            carouselMaxRow={4}
                            isCarousel={true}
                            onClick={v=>{this.setState({text: this.state.text+v.text})}}
                        />:null
                    }
                </div>
            </div>
        )
    }
}
export default Chat

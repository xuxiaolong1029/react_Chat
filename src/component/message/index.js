import React from 'react'
import { connect } from 'react-redux'
import {List,Badge} from 'antd-mobile'
@connect(
    state => state
)
class Msg extends React.Component{
    getLast(arr){
        return arr[arr.length-1]
    }
    constructor(props){
        super(props);
        this.state = {

        };
    }
    render(){
        const msgGroup = {};
        this.props.chat.chatMsg.forEach(v=>{
            msgGroup[v.chatId] = msgGroup[v.chatId]||[];
            msgGroup[v.chatId].push(v)
        });
        const chatList = Object.values(msgGroup).sort((a,b)=>{
            let a_lastTime = this.getLast(a).create_time;
            let b_lastTime = this.getLast(b).create_time;
            return b_lastTime-a_lastTime;
        });
        let Item = List.Item;
        let Brief = Item.Brief;
        let userId = this.props.user._id;
        const userInfo = this.props.chat.users;
        //1.eslint 代码校验工具
        //2.react16特有的错误处理机制
        //3 react性能优化
        return Object.keys(msgGroup).length?(
            <div>
                <List>
                    {
                        chatList.map(v=>{
                            const unreadnum = v.filter(v=>!v.read&&v.from!==userId).length;
                            const lastItem = this.getLast(v);
                            const targetId = lastItem.from===userId?lastItem.to:lastItem.from;
                            if(!userInfo[targetId]){
                                return null
                            }
                            return(
                                <Item
                                    arrow="horizontal"
                                    onClick={
                                        ()=>{
                                            this.props.history.push('/chat?userId='+targetId)
                                        }
                                    }
                                    extra={<Badge text={unreadnum}></Badge>}
                                    key={lastItem._id} thumb={require(`../img/${userInfo[targetId].avatar}.png`)}
                                >
                                    {lastItem.content}
                                    <Brief>{userInfo[targetId].name}</Brief>
                                </Item>
                            )
                        })
                    }
                </List>
            </div>
        ):null
    }
}
export default Msg

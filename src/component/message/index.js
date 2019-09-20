import React from 'react'
import { connect } from 'react-redux'
import {List} from 'antd-mobile'
@connect(
    state => state
)
class Msg extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        };
    }
    componentDidMount(){

    }
    render(){
        const msgGroup = {};
        this.props.chat.chatMsg.forEach(v=>{
            msgGroup[v.chatId] = msgGroup[v.chatId]||[];
            msgGroup[v.chatId].push(v)
        });
        let chatList = Object.values(msgGroup);
        let Item = List.Item;
        let Brief = Item.Brief;
        let userId = this.props.user._id;
        const userInfo = this.props.chat.users;
        return Object.keys(msgGroup).length?(
           <div>
               <List>
                   {
                       chatList.map(v=>{
                          const lastItem = v.pop();
                          const targetId = v[0].from===userId?v[0].to:v[0].from;
                          console.log(userInfo[targetId])
                          let name = userInfo[targetId]?userInfo[targetId].name:'';
                          let avatar = userInfo[targetId]?userInfo[targetId].avatar:'';
                          return(
                              <Item key={lastItem._id}>
                                  {lastItem.content}
                                  <Brief>{name}</Brief>
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

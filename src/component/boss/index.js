import React from 'react'
import { connect } from 'react-redux'
import { getUserList } from "../../redux/chatuser.redux";
import UserCard from "../userCard";

@connect(
    state=>state.chatUser,
    { getUserList }
)
class Boss extends React.Component{
    componentWillMount(){
        this.props.getUserList('genius')
    }
    render(){
        return(
            <UserCard userList = {this.props.userList}>
            </UserCard>
        )
    }
}
export default Boss

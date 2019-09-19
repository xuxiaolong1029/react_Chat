import React from 'react'
import { connect } from 'react-redux'
import { getUserList } from "../../redux/chatuser.redux";
import UserCard from '../userCard/index'
@connect(
    state=>state.chatUser,
    { getUserList }
)
class Genius extends React.Component{
    componentWillMount(){
        this.props.getUserList('boss')
    }
    render(){
        return (
            <UserCard userList = {this.props.userList}>
            </UserCard>
        )
    }
}
export default Genius

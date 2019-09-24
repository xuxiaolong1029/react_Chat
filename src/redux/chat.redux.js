import { MSG_LIST,MSG_RECV,MSG_READ }from './action-type'
import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:9093');

const initState = {
    chatMsg:[],
    unread:0,
    users:{}
};

export function chat(state=initState,action) {
    switch(action.type){
        case MSG_LIST:
            return {
                ...state,users:action.payload.users,chatMsg:action.payload.msgs,unread:action.payload.msgs.filter(v=>!v.read&&v.from!==action.payload.userId).length
            };
        case MSG_RECV:
            let n = action.payload.to === action.userId?1:0;
            return {
                ...state, chatMsg:[...state.chatMsg, action.payload],unread:state.unread + n
            };
        case MSG_READ:
            const {from,num} = action.payload;
            return {
                ...state,chatMsg:state.chatMsg.map(v=>({...v,read:from===v.from?true:v.read})),unread:state.unread-num
            };
        default:
            return state;
    }
}

function msgRecv(msg,userId) {
    return {
        userId,type:'MSG_RECV',payload:msg
    }
}
//获取服务端推送过来的信息
export function recvMsg() {
    return (dispatch,getState) =>{
        socket.on('recvmsg',(data)=>{
            let userId = getState().user._id;
            dispatch(msgRecv(data,userId))
        })
    }
}
//用ws推送信息到服务端
export function senMsg(from,to,msg) {
    return dispatch =>{
        socket.emit('CHAT_SEND',{from,to,msg})
    }
}
function msgList(msgs,users,userId) {
    return {
        type:'MSG_LIST',payload:{msgs,users,userId}
    }
}
export function getMsgList() {
    return (dispatch,getState) =>{
        axios.get('/user/getmsglist').then(res=>{
            if(res.data.code===0){
                let userId = getState().user._id;
                dispatch(msgList(res.data.msgs,res.data.users,userId))
            }
        }).catch(err=>{
            console.log(err)
        })
    }
}
function msgRead({from,userId,num}) {
    return{
        type:MSG_READ ,payload:{from,userId,num}
    }
}
export function readMsg(from) {
    return (dispatch,getState) =>{
        axios.post('/user/readmsg',{from}).then(res=>{
            if(res.data.code===0){
                const userId = getState().user._id;
                dispatch(msgRead({userId,from,num:res.data.num}))
            }
        }).catch(err=>{
            console.log(err)
        })
    }
}
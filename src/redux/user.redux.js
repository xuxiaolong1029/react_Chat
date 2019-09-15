//reducer
import axios from 'axios';
import {getReadirection} from '../unit';
//const REGISTER_SUCCESS='REGISTER_SUCCESS';
//const LOGIN_SUCESS = 'LOGIN_SUCESS';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';


const initState={
    redirecTo:'',
    isAuth:false,
    msg:'',
    user:"",
    type:''
}

export function user(state=initState,action){
    switch(action.type){
        case AUTH_SUCCESS:
            return{ ...state,msg:'',redirecTo:getReadirection(action.payload),...action.payload}
        case LOAD_DATA:
                return{ ...state,msg:'',...action.payload}
        case ERROR_MSG:
            return {...state,isAuth:false,msg:action.msg}
        default:
            return state
    }   
}

export function loadData(userinfo){
    return {type:LOAD_DATA,payload:userinfo}
}
function authSuccess(data){
    return {type:AUTH_SUCCESS,payload:data}
}
function errMsg(msg){
    return {msg,type:ERROR_MSG}
}
export function updata(data){
    return dispatch=>{
        axios.post('/user/updata',data)
        .then(res=>{
            if(res.status===200&&res.data.code===0){
                dispatch(authSuccess(res.data.data))
            }else{
                dispatch(errMsg(res.data.msg))
            }
        }).catch(err=>{
            dispatch(errMsg(err))
        })
    }
}
export function login({user,pwd}){
    if(!user||!pwd){
        return errMsg('用户名密码必须输入')
    }
    return dispatch=>{
        axios.post('/user/login',{user,pwd})
        .then(res=>{
            if(res.status===200&&res.data.code===0){
                dispatch(authSuccess(res.data.data))
            }else{
                dispatch(errMsg(res.data.msg))
            }
        }).catch(err=>{
            dispatch(errMsg(err))
        })
    }
}
export function register({user,pwd,confirmPwd,type}){
    if(!user||!pwd||!type){
        return errMsg('用户名密码必须输入')
    }
    if(pwd!==confirmPwd){
        return errMsg('两次密码输入不同')
    }
    return dispatch=>{
        axios.post('/user/register',{user,pwd,confirmPwd,type})
        .then(res=>{
            if(res.status===200&&res.data.code===0){
                dispatch(authSuccess({user,pwd,type}))
            }else{
                dispatch(errMsg(res.data.msg))
            }
        }).catch(err=>{
            dispatch(errMsg(err))
        })
    }
}
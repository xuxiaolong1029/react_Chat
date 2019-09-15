//reducer
import axios from 'axios';
import {getReadirection} from '../unit';
const REGISTER_SUCCESS='REGISTER_SUCCESS';
const LOGIN_SUCESS = 'LOGIN_SUCESS';
const ERROR_MSG = 'ERROR_MSG';

const initState={
    redirecTo:'',
    isAuth:false,
    msg:'',
    user:"",
    pwd:'',
    type:''
}

export function user(state=initState,action){
    switch(action.type){
        case REGISTER_SUCCESS:
            return{ ...state,msg:'',redirecTo:getReadirection(action.payload),isAuth:true,...action.payload}
        case LOGIN_SUCESS:
            return{ ...state,msg:'',redirecTo:getReadirection(action.payload),isAuth:true,...action.payload}
        case ERROR_MSG:
            return {...state,isAuth:false,msg:action.msg}
        default:
            return state
    }   
}
function loginSuccess(data){
    return {type:LOGIN_SUCESS,payload:data}
}
function registerSuccess(data){
    return { type:REGISTER_SUCCESS,payload:data}
}
function errMsg(msg){
    return {msg,type:ERROR_MSG}
}
export function login({user,pwd}){
    if(!user||!pwd){
        return errMsg('用户名密码必须输入')
    }
    return dispatch=>{
        axios.post('/user/login',{user,pwd})
        .then(res=>{
            if(res.status===200&&res.data.code===0){
                dispatch(loginSuccess(res.data.data))
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
                dispatch(registerSuccess({user,pwd,type}))
            }else{
                dispatch(errMsg(res.data.msg))
            }
        }).catch(err=>{
            dispatch(errMsg(err))
        })
    }
}
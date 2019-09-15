//reducer
import axios from 'axios'

const REGISTER_SUCCESS='REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';

const initState={
    isAuth:'',
    msg:'',
    user:"",
    pwd:'',
    type:''
}

export function user(state,action){
    switch(action,type){
        case REGISTER_SUCCESS:
            return{ ...state,msg,isAuth,...action.payload}
        case ERROR_MSG:
            return {...state,isAuth:false,msg:action.msg}
    }
    return state
}
function registerSuccess(data){
    return { type:REGISTER_SUCCESS,payload:data}
}
function errMsg(msg){
    return {msg,type:ERROR_MSG}
}
export function register({user,pwd,confirmPwd}){
    if(!user||!pwd){
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
                dispatch(ERROR_MSG(res.data.msg))
            }
        }).catch(err=>{
            dispatch(ERROR_MSG(err))
        })
    }
}
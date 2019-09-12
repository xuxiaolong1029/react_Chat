const ADD_GUN = '+'
const REMOVE_GUN = '-'

export function counter(state=10,action){
    switch(action.type){
        case ADD_GUN:
            return state+1
        case REMOVE_GUN:
            return state-1
        default:
            return 10
    }
}
export function addGun(){
    return {type:ADD_GUN}
}
export function removeGun(){
    return {type:REMOVE_GUN}
}
export function addGunAsyns(){
    return dispatch=>{
        setTimeout(()=>{
            dispatch(addGun())
        },2000)
    }
}
export function removeGunAsyns(){
    return dispatch=>{
        setTimeout(()=>{
            dispatch(removeGun())
        },2000)
    }
}

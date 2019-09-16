import React from 'react'
import axios from 'axios'
import { Card,WingBlank } from 'antd-mobile'
class Boss extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[]
        }
    }
    componentWillMount(){
        axios.get('/user/list?type=genius').then(res=>{
            if(res.data.code===0){
                this.setState({data:res.data.data})
            }
        }).catch(err=>{

        })
    }
    render(){
        console.log(this.state);
        return(
            <WingBlank>
                {
                    this.state.data.map(v=>(
                        v.avatar?
                        <Card key={v.user}>
                            <Card.Header
                                title={v.user}
                                thumb={require(`../img/${v.avatar}.png`)}
                                extra={<span>{v.title}</span>}
                            ></Card.Header>
                            <Card.Body>{v.desc.split('\n').map(v=>(
                                <div style={{paddingLeft:20}} key={v}>{v}</div>
                            ))}</Card.Body>
                        </Card>:null
                    ))
                }
            </WingBlank>
        )
    }
}
export default Boss
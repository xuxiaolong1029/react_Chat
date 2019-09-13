import React from 'React'
import LogoImg from './job.png'
import './logo.css'
class Logo extends React.Component{
    render(){
        return (
            <div className="logo-container">
                <img src={LogoImg} alt=""/>
            </div>
        )
    }
}
export default Logo

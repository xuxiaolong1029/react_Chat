import React from 'react';

export default function imoocForm(Comp) {
    return class WrapperComp extends React.Component{
        constructor(props){
            super(props);
            this.state = {}
        }
        handleChange(key,val){
            console.log(key,val)
            this.setState({
                [key]:val
            })
        }
        render() {
            /*<Comp {...this.props}></Comp> 属性穿透*/
            return <Comp handleChange={this.handleChange} state={this.state} {...this.props}></Comp>
        }
    }
}


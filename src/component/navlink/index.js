import React from 'react';
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile';
import { withRouter } from "react-router-dom";
@withRouter
class NavListBar extends React.Component{
    static propTypes = {
        data: PropTypes.array.isRequired
    };
    render(){
        const {pathname} = this.props.location;
        const navList = this.props.data.filter(v=>!v.hide);
        const unread = this.props.unread>99?'...':this.props.unread;
        return(
            <TabBar>
                {navList.map(v=>(
                    <TabBar.Item
                        badge={v.path==='/msg'?unread:0}
                        key={v.path}
                        title={v.text}
                        icon={{uri: require(`./img/${v.icon}.png`)}}
                        selectedIcon={{uri: require(`./img/${v.icon}-active.png`)}}
                        selected={pathname===v.path}
                        onPress={()=>{
                            this.props.history.push(v.path)
                        }}
                    />
                ))}
            </TabBar>
        )
    }
}
export default NavListBar

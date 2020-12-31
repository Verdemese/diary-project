import React, { Component } from "react"

import Toolbar from "../../component/UI/Toolbar/Toolbar";
import Login from '../Login/Login';

class Layout extends Component {

    render () {

        return (
            <>
                <main style={{paddingTop: '4rem'}}>
                    {this.props.children}
                </main>
            </>            
        );
    }
}

export default Layout;
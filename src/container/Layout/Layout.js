import React, { Component } from "react"

import Toolbar from "../../component/UI/Toolbar/Toolbar";
import SignIn from "../../component/SignIn/SignIn";

class Layout extends Component {
    state = {
        isAuthenticated: true        
    }

    render () {

        let isAuthenticated = null;

        if (this.state.isAuthenticated) {
            isAuthenticated = <Toolbar />
        }

        return (
            <>
                {isAuthenticated}
                <main style={{paddingTop: '4rem'}}>
                    {this.state.isAuthenticated ? this.props.children : <SignIn />}
                </main>
            </>            
        );
    }
}

export default Layout;
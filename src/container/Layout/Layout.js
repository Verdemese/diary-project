import React, { Component } from 'react'

import Toolbar from '../../component/UI/Toolbar/Toolbar';

class Layout extends Component {
    state = {
        isAuthenticated: false        
    }

    render () {

        let isAuthenticated = null;

        if (this.state.isAuthenticated) {
            isAuthenticated = <Toolbar />
        }

        return (
            <>
                {isAuthenticated}
                <main style={{paddingTop: "4rem"}}>{this.props.children}</main>
            </>            
        );
    }
}

export default Layout;
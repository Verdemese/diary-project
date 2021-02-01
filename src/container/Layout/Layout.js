import React, { Component } from "react"

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
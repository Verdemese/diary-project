import React, { Component } from "react"
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import Toolbar from '../../container/Toolbar/Toolbar'

class Layout extends Component {
    render () {

        const toolbar = this.props.authenticated ? <Route component={Toolbar}/> : null;

        return (
            <>
                <main style={{
                    width: '100%',
                    height: '100%',
                }}>
                    {toolbar}
                    {this.props.children}
                </main>
            </>            
        );
    }
}

const mapStateToProps = state => {
    return {
        authenticated: state.ui.authenticated
    }
}

export default connect(mapStateToProps)(Layout);
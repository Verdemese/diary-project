import React from 'react';
import styled from 'styled-components'

const Backdrop = styled.div`
    padding: 0;
    position: fixed;
    z-index: 499;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    right: 0;
    top: 0;
    visibility: hidden;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.3);
    transition: opacity 0.3s;
    
    &.active {
        visibility: visible;
        opacity: 1;
    }
`

const backdrop = props => {

    return (
        <Backdrop
            className={props.opened ? 'active' : null}
            onClick={props.clicked} />
    )
}

export default backdrop;
import React, { Component } from 'react';

class LoginWrapper extends Component {

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default LoginWrapper;
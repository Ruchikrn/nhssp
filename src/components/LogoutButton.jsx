import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../actions/authActions';

class LogoutButton extends Component {
    render() {
        var { logout, ...rest } = this.props;

        return (
            <button {...rest} onClick={() => logout()}>लग आउट</button>
        );
    }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = {
  logout
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
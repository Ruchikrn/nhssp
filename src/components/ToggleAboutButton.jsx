import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleAboutModal } from '../actions/modalActions';

class ToggleAboutButton extends Component {
    render() {
        var { toggleAboutModal, ...rest } = this.props;

        return (
            <button {...rest} onClick={() => toggleAboutModal()}>पोर्टलका बारेमा</button>
        );
    }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleAboutModal: () => dispatch(toggleAboutModal())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToggleAboutButton);
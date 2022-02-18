import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setHelpTour } from '../actions/modalActions';
import {FaQuestion} from 'react-icons/fa'

class ToggleRunHelpTour extends Component {
    render() {
        var { setHelpTour, ...rest } = this.props;

        return (
            <button {...rest} onClick={() => setHelpTour()}><FaQuestion/></button>
        );
    }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        setHelpTour: () => dispatch(setHelpTour(true))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToggleRunHelpTour);
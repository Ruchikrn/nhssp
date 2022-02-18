import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isAuthenticated } from '../selectors';

class VisibleWhenAuthenticated extends Component {
  render() {
    var shouldDisplay = (
      this.props.isAuthenticated && !this.props.reverse) || (
        !this.props.isAuthenticated && this.props.reverse
      )
    if (shouldDisplay) {
      return <>{this.props.children}</>
    }
    return null;
  }
}

VisibleWhenAuthenticated.defaultProps = {
  reverse: false
};

const mapStateToProps = function (state) {
  return {
    isAuthenticated: isAuthenticated(state)
  }
}

export default connect(mapStateToProps)(VisibleWhenAuthenticated);

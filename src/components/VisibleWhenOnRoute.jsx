import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { isAuthenticated } from '../selectors';

class VisibleWhenOnRoute extends Component {
  render() {
    var shouldDisplay = this.props.location.pathname === this.props.route;
    if (shouldDisplay) {
      return <>{this.props.children}</>
    }
    return null;
  }
}

export default withRouter(VisibleWhenOnRoute);

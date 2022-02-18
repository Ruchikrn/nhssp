import React, { Component } from 'react'
import {Button} from 'reactstrap'

class ErrorInfo extends Component {
  render() {
    return (
      <div className="mt-4">
        <h1 className="h4">Oops. An error has occured.</h1>

        <Button color="primary" onClick={this.props.tryAgain}>Try again</Button>
      </div>
    );
  }
}

export default ErrorInfo;
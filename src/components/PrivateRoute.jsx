import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import { connect } from "react-redux";
import { isAuthenticated } from '../selectors';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      rest.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const mapStateToProps = function(state) {
  return {
    isAuthenticated: isAuthenticated(state)
  }
}


export default connect(mapStateToProps)(PrivateRoute);
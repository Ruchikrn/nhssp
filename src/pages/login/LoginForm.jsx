import React, { Component } from 'react'
import {Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import {toast} from 'react-toastify';
import Axios from 'axios';
import { FormGroup, Label, Form, Input, FormText, FormFeedback, Button } from 'reactstrap'

import {getAuthState} from '../../selectors'
import {login} from '../../actions/authActions'



const loginSchema = Yup.object().shape({
  'username': Yup.string()
    .required('Required'),
  'password': Yup.string()
    .required('Required'),

});

const initialValues = {
  username: '',
  password: ''
}

class LoginForm extends Component {
  state = {
    redirectToReferrer: false
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/admin/practices" } };

    if (this.props.authenticated) {
      return <Redirect to={from} />;
    }

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={(values, formikActions) => {
          this.props.login(values.username, values.password, formikActions)
        }}
      >
        {({ isSubmitting, handleSubmit, errors, touched }) => (
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="username">प्रयोगकर्तानाम</Label>
              <Input
                type="text"
                name="username"
                tag={Field}
                invalid={touched.username && errors.username}
              />
              <FormFeedback>{errors.username}</FormFeedback>
              <FormText></FormText>
            </FormGroup>
            <FormGroup>
              <Label for="password">पासवर्ड</Label>
              <Input
                type="password"
                name="password"
                tag={Field}
                invalid={touched.password && errors.password}
              />
              <FormFeedback>{errors.password}</FormFeedback>
              <FormText></FormText>
            </FormGroup>
            <Button type="submit" disabled={isSubmitting}>
            Login
            </Button>
          </Form>
        )}
      </Formik>

    );
  }
}

const mapStatetoProps = function(state) {
  return {
    ...getAuthState(state)
  }
}

const mapDispatchToProps = {
  login
}
 
export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(LoginForm));
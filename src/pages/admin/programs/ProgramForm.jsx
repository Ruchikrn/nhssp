import React, { Component } from 'react'
import * as Yup from 'yup';
import { connect } from 'react-redux'
import _ from 'lodash'
import {
  FormGroup, Col, Button, Label,
  Input, Row,
  FormFeedback, Alert
} from 'reactstrap';
import { Formik, Form, Field } from 'formik'
import Axios from 'axios';
import { getAuthToken } from '../../../selectors';
import { toast } from 'react-toastify';



class TextFieldFormGroup extends Component {
  render() {
    var { name, label, errors, touched } = this.props;
    return (
      <FormGroup row>
        <Col>
          <Label for={name}>{label}</Label>
          <Input
            type="text"
            id={name}
            name={name}
            tag={Field}
            invalid={errors[name] && touched[name]}
          />
          <FormFeedback>{errors[name]}</FormFeedback>
        </Col>
      </FormGroup>
    );
  }
}


const REQUIRED = 'अनिवार्य भर्नु पर्ने';
const TOO_SHORT = 'एकदम छोटो भयो';
const EMAIL_INVALID = 'मिल्ने इमेल लेख्नुहोस्'
const INCORRECT_FORMAT = 'ढाँचा मिलेन'

const initialValues = {
  name: ''
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required(REQUIRED),
})


class ProgramForm extends Component {
  getInitialValues = () => {
    // try getting initialValues from props
    const values = this.props.data;
    if (!values) {
      return initialValues;
    }
    return values;

  }

  render() {
    return <Formik
      initialValues={this.getInitialValues()}
      validationSchema={validationSchema}
      onSubmit={(values, { setErrors, setSubmitting, setFieldValue }) => {
        const payload = {
          ...values
        }
        const method = values.id ? 'put' : 'post';
        const url = `/api/programs/` + (method === 'put' ? `${values.id}/` : '')
        const headers = { 'Authorization': `Token ${this.props.authToken}` }

        Axios[method](url, payload, { headers: headers })
          .then(res => {
            setSubmitting(false);
            setFieldValue('id', res.data.id)
            toast.success("Success")

          })
          .catch(res => {
            if (res.data) {
              setErrors(res.data)
            }
            setErrors({ 'non_field_errors': 'There was an error submitting the form' })
            toast.error("Error saving")
            setSubmitting(false)
          })
      }}>
      {({ errors, touched, values,
        setFieldValue, setFieldTouched, isSubmitting, handleChange, handleBlur }) => (
          <Form>
            {errors.non_field_errors &&
              <Alert color="danger">
                {errors.non_field_errors}
              </Alert>
            }
            <TextFieldFormGroup
              name="name"
              label="शीर्षक"
              errors={errors}
              touched={touched}
            />

            

            <Button type="submit" color="success" disabled={isSubmitting}>
              पेश गर्नुहोस
                </Button>
          </Form>
        )}
    </Formik>
  }
}

const mapStateToProps = (state) => {
  return {
    authToken: getAuthToken(state)
  };
}
const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(ProgramForm);

import React, { Component } from "react";
import * as Yup from "yup";
import { connect } from "react-redux";
import _ from "lodash";
import {
  FormGroup,
  Col,
  Button,
  Label,
  Input,
  Row,
  FormFeedback,
  Alert
} from "reactstrap";
import { Formik, Form, Field } from "formik";
import Axios from "axios";
import { getAuthToken } from "../../../selectors";
import { toast } from "react-toastify";

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

const REQUIRED = "अनिवार्य भर्नु पर्ने";

const validationSchema = Yup.object().shape({
  name: Yup.string().required(REQUIRED),
  practice: Yup.number(),
  file: Yup.mixed().required(REQUIRED)
});

class PracticeFileForm extends Component {
  getInitialValues = () => {
    // try getting initialValues from props
    const values = this.props.data;
    if (!values) {
      return {
        name: "",
        practice: this.props.practiceId,
        file: null
      };
    }
    return values;
  };

  render() {
    return (
      <Formik
        initialValues={this.getInitialValues()}
        validationSchema={validationSchema}
        onSubmit={(values, { setErrors, setSubmitting, setFieldValue }) => {
          const formData = new FormData();
          _.forOwn(values, (value, key) => formData.set(key, value));
          formData.set("file", values.file);

          const method = values.id ? "put" : "post";
          const url =
            `/api/practicefiles/` + (method === "put" ? `${values.id}/` : "");
          const headers = {
            Authorization: `Token ${this.props.authToken}`,
            "Content-Type": "multipart/form-data"
          };

          Axios[method](url, formData, { headers: headers })
            .then(res => {
              setSubmitting(false);
              setFieldValue("id", res.data.id);
              toast.success("Success");
              this.props.onSuccess();
            })
            .catch(res => {
              if (res.data) {
                setErrors(res.data);
              }
              setErrors({
                non_field_errors: "There was an error submitting the form"
              });
              toast.error("Error saving");
              setSubmitting(false);
            });
        }}
      >
        {({
          errors,
          touched,
          values,
          setFieldValue,
          setFieldTouched,
          isSubmitting,
          handleChange,
          handleBlur
        }) => (
          <Form>
            {errors.non_field_errors && (
              <Alert color="danger">{errors.non_field_errors}</Alert>
            )}
            <TextFieldFormGroup
              name="name"
              label="File Description/Short Name"
              errors={errors}
              touched={touched}
            />

            <FormGroup>
              <Label for="file">फाइल</Label>
              <br />
              <input
                id="file"
                name="file"
                type="file"
                onChange={event => {
                  setFieldValue("file", event.currentTarget.files[0]);
                }}
              />
            </FormGroup>

            <Button
              type="submit"
              color="primary"
              size="sm"
              disabled={isSubmitting}
            >
              Upload
            </Button>
          </Form>
        )}
      </Formik>
    );
  }
}

const mapStateToProps = state => {
  return {
    authToken: getAuthToken(state)
  };
};
const mapDispatchToProps = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PracticeFileForm);

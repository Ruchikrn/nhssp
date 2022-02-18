import React, { Component } from "react";
import * as Yup from "yup";
import _ from "lodash";
import Recaptcha from "react-recaptcha";

import {
  FormGroup,
  Col,
  Button,
  Label,
  Input,
  Row,
  Card,
  CardBody,
  CardHeader,
  FormText,
  FormFeedback,
  Alert
} from "reactstrap";
import { Formik, Form, Field } from "formik";
import Axios from "axios";
import ProvinceSelect from "./filters/ProvinceSelect";
import DistrictSelect from "./filters/DistrictSelect";
import LocalBodySelect from "./filters/LocalBodySelect";
import { NewPracticeRegistrationBreadcrumb } from "./Breadcrumbs";

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
const TOO_SHORT = "एकदम छोटो भयो ।";
const EMAIL_INVALID = "मिल्ने इमेल लेख्नुहोस् ";

const initialValues = {
  description: "",
  source_description: "",
  submitter_name: "",
  submitter_email: "",
  submitter_designation: "",
  submitter_office: "",
  province: [],
  district: [],
  localbody: [],
  captcha: "",
  file: null
};

const validationSchema = Yup.object().shape({
  description: Yup.string()
    .min(1, TOO_SHORT)
    .required(REQUIRED),
  province: Yup.array()
    .min(1, REQUIRED)
    .required(REQUIRED),
  source_description: Yup.string().required(REQUIRED),
  submitter_name: Yup.string().required(REQUIRED),
  submitter_office: Yup.string(),
  submitter_designation: Yup.string(),
  submitter_email: Yup.string()
    .email(EMAIL_INVALID)
    .required(REQUIRED),
  captcha: Yup.string().required(REQUIRED)
});

class NewPracticeRegistration extends Component {
  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }
  render() {
    return (
      <div>
        <NewPracticeRegistrationBreadcrumb />
        <h1 className="h2 mt-4">नयाँ पहल दर्ता गराउँनका लागि यहाँ भर्नुहोस </h1>
        <hr />
        <div className="p-1">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setErrors, setSubmitting }) => {
              const formData = new FormData();
              _.forOwn(values, (value, key) => formData.set(key, value));
              formData.set("province", values.province[0].id);
              values.district.length &&
                formData.set("district", values.district[0].id);
              values.localbody.length &&
                formData.set("localbody", values.localbody[0].id);
              formData.set("file", values.file);

              Axios.post("/api/new_practice_registration/", formData, {
                headers: {
                  "content-type": "multipart/form-data"
                }
              })
                .then(res => {
                  setSubmitting(false);
                  this.props.history.push({
                    pathname: "/submitted",
                    state: { id: res.data.id }
                  });
                })
                .catch(res => {
                  if (res.data) {
                    setErrors(res.data);
                  }
                  setErrors({
                    non_field_errors: "There was an error submitting the form"
                  });
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

                <FormGroup>
                  <Row>
                    <Col md="4">
                      <ProvinceSelect
                        name="province"
                        value={values.province}
                        isMulti={false}
                        onChange={value => {
                          setFieldValue("province", value);
                          // Clear districts and localbodies
                          setFieldValue("district", []);
                          setFieldValue("localbody", []);
                        }}
                        onBlur={() => setFieldTouched("province", true)}
                      />
                      <div className="form-control d-none is-invalid" />
                      <FormFeedback>
                        {touched.province && errors.province}
                      </FormFeedback>
                      <FormText />
                    </Col>

                    <Col md="4">
                      <DistrictSelect
                        value={values.district}
                        selectedProvinces={values.province}
                        isMulti={false}
                        isClearable={true}
                        onChange={value => {
                          setFieldValue("district", value);
                          // Clear localbody
                          setFieldValue("localbody", []);
                        }}
                        onBlur={() => setFieldTouched("district", true)}
                      />
                    </Col>
                    <Col md="4">
                      <LocalBodySelect
                        value={values.localbody}
                        isMulti={false}
                        isClearable={true}
                        selectedDistricts={values.district}
                        onChange={value => setFieldValue("localbody", value)}
                        onBlur={() => setFieldTouched("localbody", true)}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <Row>
                  <Col md="6">
                    <TextFieldFormGroup
                      name="submitter_name"
                      label="तपाइको नाम"
                      errors={errors}
                      touched={touched}
                    />
                  </Col>
                  <Col md="6">
                    <TextFieldFormGroup
                      name="submitter_email"
                      label="तपाइको इमेल"
                      errors={errors}
                      touched={touched}
                    />
                  </Col>
                </Row>

                <TextFieldFormGroup
                  name="submitter_designation"
                  label="तपाईंको पद"
                  errors={errors}
                  touched={touched}
                />
                <TextFieldFormGroup
                  name="submitter_office"
                  label="तपाईंको कार्यालय"
                  errors={errors}
                  touched={touched}
                />

                <FormGroup row>
                  <Col>
                    <Label for="description">नबिनतम् कामको बिवरण</Label>
                    <textarea
                      id="description"
                      name="description"
                      rows="7"
                      cols="100"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        touched.description && errors.description
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                    />
                    <FormFeedback>
                      {touched.description && errors.description}
                    </FormFeedback>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col>
                    <Label for="source_description">श्रोत</Label>
                    <textarea
                      id="source_description"
                      name="source_description"
                      rows="2"
                      cols="100"
                      value={values.source_description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        touched.source_description && errors.source_description
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                    />
                    <FormFeedback>
                      {touched.source_description && errors.source_description}
                    </FormFeedback>
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Label for="file">सान्दर्भिक फाइल</Label>
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

                <FormGroup>
                  <Recaptcha
                    sitekey="6LceqmUeAAAAAEfUfDxGUlv6fLfuB1ghAq496V-Q"
                    render="explicit"
                    hl="ne"
                    verifyCallback={response => {
                      setFieldValue("captcha", response);
                    }}
                    onloadCallback={() => {
                      console.log("done loading!");
                    }}
                  />
                  <div className="form-control d-none is-invalid" />
                  <FormFeedback>{errors.captcha}</FormFeedback>
                  <FormText />
                </FormGroup>
                <Button type="submit" color="primary" disabled={isSubmitting}>
                  पेश गर्नुहोस
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

export default NewPracticeRegistration;

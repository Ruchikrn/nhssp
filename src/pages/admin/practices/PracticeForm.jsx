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
  FormText,
  FormFeedback,
  Alert
} from "reactstrap";
import { Formik, Form, Field } from "formik";
import Axios from "axios";
import LocalBodySelect from "../../../components/filters/LocalBodySelect";
import DistrictSelect from "../../../components/filters/DistrictSelect";
import ProvinceSelect from "../../../components/filters/ProvinceSelect";
import SourceTypeSelect from "../../../components/filters/SourceTypeSelect";
import ProgramSelect from "../../../components/filters/ProgramSelect";
import { getAuthToken } from "../../../selectors";
import { toast } from "react-toastify";
import PracticeDescriptionEditor from "./PracticeDescriptionEditor";

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
const TOO_SHORT = "एकदम छोटो भयो";
const EMAIL_INVALID = "मिल्ने इमेल लेख्नुहोस्";
const INCORRECT_FORMAT = "ढाँचा मिलेन";

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
  source_type: [],
  programs: [],
  source_url: "",
  title: ""
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required(REQUIRED),
  description: Yup.string()
    .min(1, TOO_SHORT)
    .required(REQUIRED),
  province: Yup.array()
    .min(1, REQUIRED)
    .required(REQUIRED),
  programs: Yup.array()
    .min(1, REQUIRED)
    .required(REQUIRED),
  source_type: Yup.array()
    .min(1, REQUIRED)
    .required(REQUIRED),
  source_description: Yup.string().required(REQUIRED),
  source_url: Yup.string()
    .url(INCORRECT_FORMAT)
    .required(REQUIRED),
  submitter_name: Yup.string(),
  submitter_office: Yup.string(),
  submitter_designation: Yup.string(),
  submitter_email: Yup.string().email(EMAIL_INVALID)
});

class PracticeForm extends Component {
  getInitialValues = () => {
    // try getting initialValues from props
    const values = this.props.data;
    if (!values) {
      return initialValues;
    }
    // convert id to select list for display with labels

    ["province", "district", "localbody", "source_type"].map(s => {
      if (values[s] === null) {
        values[s] = [];
      } else {
        values[s] = [
          {
            id: values[s],
            name: values[`${s}_detail`]["name"]
          }
        ];
      }
    });
    values["programs"] = values["programs_detail"];
    return values;
  };
  render() {
    return (
      <Formik
        initialValues={this.getInitialValues()}
        validationSchema={validationSchema}
        onSubmit={(values, { setErrors, setSubmitting, setFieldValue }) => {
          const payload = {
            ...values,
            province: values.province[0].id,
            district: values.district.length ? values.district[0].id : null,
            localbody: values.localbody.length ? values.localbody[0].id : null,
            programs: _.map(values.programs, "id"),
            source_type: values.source_type.length
              ? values.source_type[0].id
              : null
          };
          const method = values.id ? "put" : "post";
          const url =
            `/api/practices/` + (method === "put" ? `${values.id}/` : "");
          const headers = { Authorization: `Token ${this.props.authToken}` };

          Axios[method](url, payload, { headers: headers })
            .then(res => {
              setSubmitting(false);
              setFieldValue("id", res.data.id);
              toast.success("Success");
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
              name="title"
              label="नबिनतम् कामको शीर्षक"
              errors={errors}
              touched={touched}
            />

            <FormGroup row>
              <Col>
                <Label for="description">नबिनतम् कामको बिवरण</Label>

                <PracticeDescriptionEditor
                  value={values.description}
                  onChange={v => {
                    setFieldValue("description", v);
                    setFieldTouched("description");
                  }}
                />

                <div className="form-control d-none is-invalid" />
                <FormFeedback>{errors.description}</FormFeedback>
              </Col>
            </FormGroup>

            <TextFieldFormGroup
              name="source_url"
              label="श्रोतको link"
              errors={errors}
              touched={touched}
            />
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
            <hr />
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
                  label="पेशकर्ताको नाम"
                  errors={errors}
                  touched={touched}
                />
              </Col>
              <Col md="6">
                <TextFieldFormGroup
                  name="submitter_email"
                  label="पेशकर्ताको इमेल"
                  errors={errors}
                  touched={touched}
                />
              </Col>
            </Row>

            <TextFieldFormGroup
              name="submitter_designation"
              label="पेशकर्ताको पद"
              errors={errors}
              touched={touched}
            />
            <TextFieldFormGroup
              name="submitter_office"
              label="पेशकर्ताको कार्यालय"
              errors={errors}
              touched={touched}
            />
            <FormGroup>
              <ProgramSelect
                value={values.programs}
                isMulti={true}
                onChange={value => setFieldValue("programs", value)}
                onBlur={() => setFieldTouched("programs", true)}
                creatable
              />
              <div className="form-control d-none is-invalid" />
              <FormFeedback>{errors.programs}</FormFeedback>
              <FormText />
            </FormGroup>
            <FormGroup>
              <SourceTypeSelect
                value={values.source_type}
                isMulti={false}
                onChange={value => setFieldValue("source_type", value)}
                onBlur={() => setFieldTouched("source_type", true)}
              />
              <div className="form-control d-none is-invalid" />
              <FormFeedback>
                {touched.source_type && errors.source_type}
              </FormFeedback>
              <FormText />
            </FormGroup>

            <Button type="submit" color="primary" disabled={isSubmitting}>
              पेश गर्नुहोस
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
)(PracticeForm);

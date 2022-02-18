import React, { Component } from "react";
import { Card, CardBody, Button, Row, Col } from "reactstrap";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import withPractice from "./withPractice";
import { Twitter, Facebook } from "react-social-sharing";
import { FaPrint, FaEdit } from "react-icons/fa";
import PracticeDetailPageLoading from "./PracticeDetailPageLoading";
import PracticeDescriptionEditor from "../admin/practices/PracticeDescriptionEditor";
import { PracticeDetailBreadcrumb } from "../../components/Breadcrumbs";
import VisibleWhenAuthenticated from "../../components/VisibleWhenAuthenticated";
import strftime from 'strftime';
import { englishToNepaliNumber } from 'nepali-number';


import "./PracticeDetailPage.css";

class PracticeDetailPage extends Component {
  render() {
    var { data, ...rest } = this.props;
    return (
      <>
        <Helmet>
          <title>{data.title}</title>
        </Helmet>
        <PracticeDetailBreadcrumb />
        <h1 className="mt-4">{data.title}</h1>
        <hr />
        <span className="date my-2 text-muted">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            width="16px"
            height="16px"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          &nbsp;
          {englishToNepaliNumber(
            strftime('%Y-%m-%d', new Date(data.created_at))
          )}
        </span>
        <Row className="mt-4">
          <Col sm="12" md={{ size: 8 }}>
            <PracticeDescriptionEditor
              readOnly={true}
              className="asd"
              value={data.description}
            />
            <hr />

            <p>
              <strong>स्रोत:</strong>
              <br />
              {data.source_description}
              <br />
            </p>
          </Col>
          <Col md="4">
            <Card className="mt-2">
              <CardBody>
                <Row>
                  <Col className="text-muted">
                    <strong>जानकारीको श्रोत:</strong>
                    <br />
                    {data.source_type_detail ? (
                      data.source_url ? (
                        <a
                          className=""
                          href={data.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {data.source_type_detail.name}
                        </a>
                      ) : (
                        <span>{data.source_type_detail.name}</span>
                      )
                    ) : (
                      <></>
                    )}

                    <br />
                    <br />

                    <strong>कार्यक्रम</strong>
                    <br />
                    {data.programs_detail.map((program) => (
                      <span>
                        {program.name}
                        <br />
                      </span>
                    ))}
                    <br />

                    <strong>प्रदेश</strong>
                    <br />
                    {data.province_detail.name}
                    <br />
                    <br />
                    {data.district_detail ? (
                      <>
                        <strong>जिल्ला</strong>
                        <br />
                        {data.district_detail.name}
                        <br />
                        <br />
                      </>
                    ) : (
                      <></>
                    )}
                    {data.localbody_detail ? (
                      <>
                        <strong>स्थानिय तह</strong>
                        <br />
                        {data.localbody_detail.name}
                        <br />
                        <br />
                      </>
                    ) : (
                      <></>
                    )}
                    <br />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="d-print-none">
          <Col>
            <VisibleWhenAuthenticated>
              <Link to={`/admin/practices/${data.id}/edit`}>
                <Button color="info" className="mr-2">
                  <FaEdit /> Edit
                </Button>
              </Link>
            </VisibleWhenAuthenticated>
            <Button
              color="info"
              className="mr-2"
              onClick={() => window.print()}
            >
              <FaPrint /> Print
            </Button>
            <Twitter
              className="btn mr-0"
              link={window.location.origin + `/practices/${data.id}`}
              small
              message={data.title}
            />
            <Facebook
              className="btn mr-0"
              link={window.location.origin + `/practices/${data.id}`}
              small
            />
          </Col>
        </Row>
      </>
    );
  }
}

export default withPractice(PracticeDetailPage, PracticeDetailPageLoading);

import React, { Component } from 'react'
import {
  Card, CardBody, Button,
  Row, Col
} from 'reactstrap';
import Skeleton from 'react-loading-skeleton';
import  { PracticeDetailBreadcrumb } from '../../components/Breadcrumbs';


class PracticeDetailPageLoading extends Component {
  render() {
    var { data, ...rest } = this.props;
    return (
      <>
        <PracticeDetailBreadcrumb />
        <h1 className="mt-4"><Skeleton/></h1>
        <hr />
        <Row className="mt-4">
          <Col sm="12" md={{ size: 8 }}>
            <p><Skeleton count={10}/></p>
            <hr />
          </Col>
          <Col md="4">
            <Card className="mt-2">
              <CardBody>
                <Row>
                  <Col className="text-muted">
                    <Skeleton count={5}/>

                  </Col>



                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    )
  }
}

export default PracticeDetailPageLoading;

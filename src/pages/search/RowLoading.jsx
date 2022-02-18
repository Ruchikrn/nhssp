import React, { Component } from 'react'
import {
  Card, CardBody, CardHeader, CardFooter, CardText, Badge,
  Row, Col
} from 'reactstrap';
import Skeleton from 'react-loading-skeleton';


class RowLoading extends Component {
  render() {
    var { data, ...rest } = this.props;
    return (
      <Card {...rest}>
        <CardHeader className="text-primary">
          <h2 className="h5"><Skeleton/></h2>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="9">
              <CardText>
                <Skeleton count={3}/>
                <strong><Skeleton/></strong><br />
                <Skeleton count={3}/>
              </CardText>
            </Col>
            <Col md="3" className="text-muted border border-right-0 border-top-0 border-bottom-0">
              <Skeleton count={3}/> <br />
            </Col>
          </Row>
        </CardBody>
        <CardFooter>
          
        </CardFooter>
      </Card>
    )
  }
}

export default RowLoading;

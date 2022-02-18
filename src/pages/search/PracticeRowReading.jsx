import React, { Component } from 'react'
import _ from 'lodash'
import {
  Card, CardBody, CardHeader, CardFooter, CardText, Badge,
  Row, Col
} from 'reactstrap';
import { Link } from 'react-router-dom'
import PracticeDescriptionEditor from '../admin/practices/PracticeDescriptionEditor';

const truncateParams = {
  length: 200, separator: '।', omission: '। '
}


class PracticeRowReading extends Component {
  render() {
    var { data, ...rest } = this.props;
    return (
      <Card {...rest}>
        <CardHeader className="text-primary">
          <h2 className="h5">
          <Link to={`/practices/${data.id}`}>{data.title}</Link>
          
          <br/>
          </h2>
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
              <CardText>
                <PracticeDescriptionEditor readOnly className="" value={data.description}/>               
              </CardText>
              <CardText>
                {data.source_description}
              </CardText>
            </Col>
          </Row>
        </CardBody>
      </Card>
    )
  }
}

export default PracticeRowReading;

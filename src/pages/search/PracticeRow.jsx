import React, { Component } from 'react'
import _ from 'lodash'
import {
  Card, CardBody, CardHeader, CardFooter, CardText, Badge,
  Row, Col
} from 'reactstrap';
import { Link } from 'react-router-dom'
import { truncateFeatured } from '../../utils/truncate';


class PracticeRow extends Component {
  render() {
    var { data, ...rest } = this.props;
    return (
      <Card {...rest}>
        <CardHeader className="text-primary">
          <h2 className="h5">
            <Link to={`/practices/${data.id}`}>{data.title}</Link>

            <br />
          </h2>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="9">
              <CardText>
                {truncateFeatured(data.description)}<br/>
                <Link to={`/practices/${data.id}`} className="text-success">
                  क्रमश...
                </Link>
              </CardText>
            </Col>
            <Col md="3" className="text-muted border border-right-0 border-top-0 border-bottom-0">
            <strong>जानकारीको श्रोत:</strong><br />
                    {
                      data.source_type_detail ?
                        data.source_url ? <a className=""
                          href={data.source_url} target="_blank" rel="noopener noreferrer" >{data.source_type_detail.name}</a>
                          : <span>{data.source_type_detail.name}</span>

                        : <></>
                    }
            </Col>
          </Row>
        </CardBody>
      </Card>
    )
  }
}

export default PracticeRow;

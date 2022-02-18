import React, { Component } from 'react'
import { Button, Card, CardHeader, CardBody } from 'reactstrap'
import FederalPracticeForm from './FederalPracticeForm';
import withModelData from '../generic/withModelData';


class FederalPracticeEditPage extends Component {
  render() {
    return (
      <>
        <Card>
          <CardHeader><h5 className="mb-0">Edit FederalPractice</h5>
          </CardHeader>
          <CardBody>
            <FederalPracticeForm data={this.props.data} />
          </CardBody>
        </Card>
      </>
    );
  }
}

export default withModelData(FederalPracticeEditPage, 'federalpractices');
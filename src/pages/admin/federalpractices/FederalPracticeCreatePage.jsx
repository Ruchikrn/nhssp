import React, { Component } from 'react'
import { Card, CardHeader, CardBody } from 'reactstrap'
import FederalPracticeForm from './FederalPracticeForm';


class FederalPracticeCreatePage extends Component {
  render() {
    return (
      <>
        <Card>
          <CardHeader><h5 className="mb-0">Create FederalPractice</h5>
          </CardHeader>
          <CardBody>
            <FederalPracticeForm />
          </CardBody>
        </Card>
      </>
    );
  }
}

export default FederalPracticeCreatePage;
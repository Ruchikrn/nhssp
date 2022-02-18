import React, { Component } from 'react'
import { Card, CardHeader, CardBody } from 'reactstrap'
import PracticeForm from './PracticeForm';


class PracticeEdit extends Component {
  render() {
    return (
      <>
        <Card>
          <CardHeader><h5 className="mb-0">Create पहल</h5>
          </CardHeader>
          <CardBody>
            <PracticeForm />
          </CardBody>
        </Card>
      </>
    );
  }
}

export default PracticeEdit;
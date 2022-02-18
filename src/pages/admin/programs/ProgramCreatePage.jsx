import React, { Component } from 'react'
import { Card, CardHeader, CardBody } from 'reactstrap'
import ProgramForm from './ProgramForm';


class ProgramCreatePage extends Component {
  render() {
    return (
      <>
        <Card>
          <CardHeader><h5 className="mb-0">Create Program</h5>
          </CardHeader>
          <CardBody>
            <ProgramForm />
          </CardBody>
        </Card>
      </>
    );
  }
}

export default ProgramCreatePage;
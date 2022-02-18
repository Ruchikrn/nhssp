import React, { Component } from 'react'
import { Button, Card, CardHeader, CardBody } from 'reactstrap'
import ProgramForm from './ProgramForm';
import withModelData from '../generic/withModelData';


class ProgramEditPage extends Component {
  render() {
    return (
      <>
        <Card>
          <CardHeader><h5 className="mb-0">Edit program</h5>
          </CardHeader>
          <CardBody>
            <ProgramForm data={this.props.data} />
          </CardBody>
        </Card>
      </>
    );
  }
}

export default withModelData(ProgramEditPage, 'programs');
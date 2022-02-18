import React, { Component } from 'react'
import CrudList from '../generic/CrudList';

const columns = [
  { 'name': 'Name', 'accessor': (row) => row.name }
]

class ProgramListPage extends Component {
  render() {
    return (
      <CrudList columns={columns} modelPlural="programs" />
    );
  }
}

export default ProgramListPage;
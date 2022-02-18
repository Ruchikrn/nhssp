import React, { Component } from 'react'
import {Row, Col} from 'reactstrap';
import { Route, Switch } from 'react-router-dom'
import AdminNav from './AdminNav';
import PracticeListPage from './practices/PracticeListPage';
import ModerationListPage from './moderation/ModerationListPage';
import ProgramListPage from './programs/ProgramListPage';
import PracticeEditPage from './practices/PracticeEditPage';
import PracticeCreatePage from './practices/PracticeCreatePage';
import ProgramEditPage from './programs/ProgramEditPage';
import ProgramCreatePage from './programs/ProgramCreatePage';
import AdminSummaryPage from './AdminSummaryPage';
import FederalPracticeListPage from './federalpractices/FederalPracticeListPage';
import FederalPracticeCreatePage from './federalpractices/FederalPracticeCreatePage';
import FederalPracticeEditPage from './federalpractices/FederalPracticeEditPage';



class AdminDashboard extends Component {
  render() {
    return (
      <Row>
        <Col md="12">
        <AdminNav className="mb-4" />
        </Col>
        <Col>
        <h3></h3>
        <Switch>
          <Route path="/admin" exact component={AdminSummaryPage} />
          <Route path="/admin/practices" exact component={PracticeListPage} />
          <Route path="/admin/practices/create" exact component={PracticeCreatePage} />
          <Route path="/admin/practices/:id/edit" exact component={PracticeEditPage} />
          <Route path="/admin/programs" exact component={ProgramListPage} />
          <Route path="/admin/programs/create" exact component={ProgramCreatePage} />
          <Route path="/admin/programs/:id/edit" exact component={ProgramEditPage} />
          <Route path="/admin/moderation" exact component={ModerationListPage} />
          <Route path="/admin/federalpractices" exact component={FederalPracticeListPage} />
          <Route path="/admin/federalpractices/create" exact component={FederalPracticeCreatePage} />
          <Route path="/admin/federalpractices/:id/edit" exact component={FederalPracticeEditPage} />
        </Switch>
        </Col>
      </Row>


    );
  }
}

export default AdminDashboard;
import React, { Component } from 'react'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { Link } from 'react-router-dom'

export class PracticeDetailBreadcrumb extends Component {
  render() {
    return (
      <>
        <Breadcrumb className="d-print-none">
          <BreadcrumbItem><Link to="/">गृह पृष्ठ</Link></BreadcrumbItem>
          <BreadcrumbItem><Link to="/practices">पहलहरु</Link></BreadcrumbItem>
          <BreadcrumbItem active>पहल</BreadcrumbItem>
        </Breadcrumb>
      </>
    );
  }
}

export class PracticeListingBreadcrumb extends Component {
  render() {
    return (
      <>
        <Breadcrumb className="d-print-none">
          <BreadcrumbItem><Link to="/">गृह पृष्ठ</Link></BreadcrumbItem>
          <BreadcrumbItem active>पहलहरु</BreadcrumbItem>
        </Breadcrumb>
      </>
    );
  }
}


export class FederalPracticesBreadcrumb extends Component {
  render() {
    return (
      <>
        <Breadcrumb className="d-print-none">
          <BreadcrumbItem><Link to="/">गृह पृष्ठ</Link></BreadcrumbItem>
          <BreadcrumbItem active>संघीय तहका पहलहरु</BreadcrumbItem>
        </Breadcrumb>
      </>
    );
  }
}

export class NewPracticeRegistrationBreadcrumb extends Component {
  render() {
    return (
      <>
        <Breadcrumb className="d-print-none">
          <BreadcrumbItem><Link to="/">गृह पृष्ठ</Link></BreadcrumbItem>
          <BreadcrumbItem active>नयाँ पहल दर्ता</BreadcrumbItem>
        </Breadcrumb>
      </>
    );
  }
}

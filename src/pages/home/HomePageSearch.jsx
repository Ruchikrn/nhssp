import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import ProvinceSelect from '../../components/filters/ProvinceSelect';
import DistrictSelect from '../../components/filters/DistrictSelect';
import LocalBodySelect from '../../components/filters/LocalBodySelect';
import Datepicker from '../../components/filters/Datepicker';

class HomePageSearch extends Component {
    render() {
        return (
          <Row className="justify-content-center align-items-end">
            <Col md="12">
              <Datepicker/>
            </Col>
            <Col md="12">
              <ProvinceSelect
                isMulti={false}
                label="प्रदेश"
                className="mx-auto mb-4"
              />
            </Col>
            <Col md="12">
              <DistrictSelect
                isMulti={false}
                label="जिल्ला"
                className="mx-auto mb-4 "
              />
            </Col>
            <Col md="12">
              <LocalBodySelect
                isMulti={false}
                label="स्थानिय तह"
                className="mx-auto mb-4"
              />
            </Col>
            <Col md="12">
              <Link to="/practices" className="btn btn-primary d-block">
                खोज
              </Link>
            </Col>
          </Row>
        );
    }
}

export default HomePageSearch;
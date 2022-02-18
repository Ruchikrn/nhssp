import React, { Component } from "react";
import { Card, CardHeader, CardBody, CardFooter, Button } from "reactstrap";

import ProvinceSelect from "../../components/filters/ProvinceSelect";
import DistrictSelect from "../../components/filters/DistrictSelect";
import LocalBodySelect from "../../components/filters/LocalBodySelect";
import ProgramSelect from "../../components/filters/ProgramSelect";
import SourceTypeSelect from "../../components/filters/SourceTypeSelect";
import Datepicker from "../../components/filters/Datepicker";

class FilterSideBar extends Component {
  render() {
    return (
      <Card>
        <CardBody>
          <Datepicker />
          <ProvinceSelect isMulti className="mb-4" />
          <DistrictSelect isMulti className="mb-4" />
          <LocalBodySelect isMulti className="mb-4" />
        </CardBody>
      </Card>
    );
  }
}

export default FilterSideBar;

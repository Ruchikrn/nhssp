import React, { Component } from "react";
import _ from "lodash";
import CrudList from "../generic/CrudList";
import { PracticeStatusIcons } from "../practices/PracticeListPage";

class ModerationListPage extends Component {
  render() {
    return (
      <CrudList
        columns={[
          {
            name: "Published",
            accessor: row => PracticeStatusIcons[row.status]
          },
          { name: "Description", accessor: row => row.description },
          {
            name: "Source Description",
            accessor: row => row.source_description
          }
        ]}
        modelPlural="practices"
        extraUrlParams={{ status: "pending" }}
      />
    );
  }
}

export default ModerationListPage;

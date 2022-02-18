import React, { Component } from "react";
import {
  Button,
  CardTitle,
  CardHeader,
  Card,
  CardBody,
  CardFooter
} from "reactstrap";
import _ from "lodash";
import CrudList from "../generic/CrudList";
import PracticeFileForm from "./PracticeFileForm";

const columns = [
  { name: "Name", accessor: row => row.name },
  { name: "File", accessor: row => row.file }
];

class PracticeFilesForm extends Component {
  state = {
    refreshCount: false
  };
  render() {
    return (
      <>
        <PracticeFileForm
          practiceId={this.props.data.id}
          onSuccess={() =>
            this.setState({ refreshCount: this.state.refreshCount + 1 })
          }
          key={this.state.refreshCount}
        />
        <div className="mt-4" />
        <CrudList
          columns={columns}
          modelPlural="practicefiles"
          extraUrlParams={{ practice: this.props.data.id }}
          displayItemSizeDropdown={false}
          refresh={this.state.refreshCount}
          enabledActions={["DELETE"]}
        />
      </>
    );
  }
}

export default PracticeFilesForm;

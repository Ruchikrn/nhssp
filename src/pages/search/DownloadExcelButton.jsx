import React, { Component } from "react";
import { connect } from "react-redux";
import { getSearchParams } from "../../selectors";
import queryString from "query-string";

import { Button } from "reactstrap";
import { FaFileExcel } from "react-icons/fa";

class DownloadExcelButton extends Component {
  downloadExcel = () => {
    const downloadParams = { ...this.props.params, page_size: 1000 };
    const query = queryString.stringify(downloadParams);
    const url = `http://localhost:8000/api/practices.xlsx?${query}`;
    console.log(url);
    window.open(url, "_blank");
  };
  render() {
    return (
      <Button color="secondary mr-2" onClick={this.downloadExcel}>
        <FaFileExcel />
      </Button>
    );
  }
}

const mapStateToProps = state => {
  return {
    params: getSearchParams(state)
  };
};
export default connect(
  mapStateToProps,
  {}
)(DownloadExcelButton);

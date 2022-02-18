import React, { Component } from "react";
import CrudList from "../generic/CrudList";
import { FaCheck, FaTimes } from "react-icons/fa";

const columns = [
  { name: "Title", accessor: row => row.title },
  { name: "Url", accessor: row => row.url },
  { name: "Draft", accessor: row => (row.draft ? "Yes" : "") }
];

class FederalPracticeListPage extends Component {
  render() {
    return <CrudList columns={columns} modelPlural="federalpractices" />;
  }
}

export default FederalPracticeListPage;

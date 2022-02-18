import React, { Component } from "react";
import { FaCheck, FaTimes, FaHourglassStart } from "react-icons/fa";
import CrudList from "../generic/CrudList";

export const PracticeStatusIcons = {
  approved: <FaCheck color="green" />,
  pending: <FaHourglassStart color="green" />,
  rejected: <FaTimes color="red" />
};

export const columns = [
  {
    name: "Published",
    accessor: row => PracticeStatusIcons[row.status]
  },

  { name: "Title", accessor: row => row.title }
];

class PracticeListPage extends Component {
  render() {
    return (
      <>
        <CrudList modelPlural="practices" columns={columns} />
      </>
    );
  }
}

export default PracticeListPage;

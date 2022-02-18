import React, { Component } from "react";
import { Button, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import _ from "lodash";
import RTable from "../../../components/RTable";
import { getAuthToken } from "../../../selectors";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import ErrorInfo from "./ErrorInfo";
import PagePagination from "../../../components/PagePagination";
import PageSizeDropdown from "./PageSizeDropdown";
import DeleteModal from "./DeleteModal";
import { toast } from "react-toastify";

class CrudList extends Component {
  state = {
    rows: [],
    page: 1,
    pages: 1,
    pageSize: 5,
    count: 0,
    loading: false,
    errored: false,
    deleteModal: false,
    deleteRowData: null,
    forceRefresh: false
  };
  fetchData = force => {
    this.setState({ loading: true, errored: false, forceRefresh: false });
    const headers = { Authorization: `Token ${this.props.authToken}` };

    const params = {
      page_size: this.state.pageSize,
      page: this.state.page,
      ...this.props.extraUrlParams
    };

    axios
      .get(`/api/${this.props.modelPlural}/`, { params, headers })
      .then(res => {
        const pages = Math.ceil(res.data.count / this.state.pageSize);
        this.setState({ rows: res.data.results, loading: false, pages });
      })
      .catch(err => this.setState({ errored: true, loading: false }));
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.pageSize !== this.state.pageSize ||
      prevProps.refresh !== this.props.refresh ||
      this.state.forceRefresh === true
    )
      this.fetchData();
  }

  toggleDeleteModal = () =>
    this.setState({ deleteModal: !this.state.deleteModal });
  openDeleteModal = row =>
    this.setState({ deleteModal: true, deleteRowData: row });

  doDelete = () => {
    const headers = { Authorization: `Token ${this.props.authToken}` };
    axios
      .delete(
        `/api/${this.props.modelPlural}/${this.state.deleteRowData.id}/`,
        { headers }
      )
      .then(() => {
        toast.success("Deleted");
        this.setState({ forceRefresh: true });
      })
      .catch(err => toast.error(err.data))
      .then(() => this.toggleDeleteModal());
  };

  isActionEnabled = action => {
    return _.includes(this.props.enabledActions, action);
  };

  render() {
    const modelPlural = this.props.modelPlural;
    const columns = [
      ...this.props.columns,
      {
        name: "Actions",
        accessor: row => (
          <div className="float-right">
            {this.isActionEnabled("READ") && (
              <Link to={`/${modelPlural}/${row.id}`} target="_blank">
                <Button color="primary mr-1" outline>
                  <FaEye />
                </Button>
              </Link>
            )}
            {this.isActionEnabled("UPDATE") && (
              <Link to={`/admin/${modelPlural}/${row.id}/edit`}>
                <Button color="secondary mr-1" outline>
                  <FaEdit />
                </Button>
              </Link>
            )}
            {this.isActionEnabled("DELETE") && (
              <Button
                color="danger mr-1"
                outline
                onClick={() => this.openDeleteModal(row)}
              >
                <FaTrash />
              </Button>
            )}
          </div>
        )
      }
    ];
    const rows = this.state.rows;
    return (
      <>
        {this.state.loading && <div>Loading...</div>}
        {!this.state.loading && !this.state.errored && (
          <>
            <div className="float-right mb-2">
              {this.isActionEnabled("CREATE") && (
                <Link to={`/admin/${modelPlural}/create`}>
                  <Button color="primary" outline>
                    Add
                  </Button>
                </Link>
              )}
            </div>
            {this.props.displayItemSizeDropdown && (
              <Row className="mb-4">
                <Col>
                  <PageSizeDropdown
                    value={this.state.pageSize}
                    onChange={pageSize => this.setState({ pageSize })}
                  />
                </Col>
              </Row>
            )}
            <RTable
              columns={columns}
              rows={rows}
              snStart={(this.state.page - 1) * this.state.pageSize}
            />
            <hr />
            <PagePagination
              pages={this.state.pages}
              page={this.state.page}
              onPageChange={page => this.setState({ page })}
            />
          </>
        )}
        {this.state.errored && <ErrorInfo tryAgain={this.fetchData} />}
        {this.state.deleteRowData && (
          <DeleteModal
            isOpen={this.state.deleteModal}
            toggle={this.toggleDeleteModal}
            title={this.state.deleteRowData.title}
            doDelete={this.doDelete}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    authToken: getAuthToken(state)
  };
};
const mapDispatchToProps = {};

CrudList.defaultProps = {
  displayItemSizeDropdown: true,
  enabledActions: ["CREATE", "READ", "UPDATE", "DELETE"]
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CrudList);

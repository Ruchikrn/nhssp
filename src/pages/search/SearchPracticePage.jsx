import React, { Component } from "react";
import { Row, Col, Button } from "reactstrap";
import { connect } from "react-redux";
import FilterSideBar from "./FilterSideBar";
import FilteredPracticeList from "./FilteredPracticeList";
import SearchPagination from "./SearchPagination";
import SearchBar from "./SearchBar";
import { PracticeListingBreadcrumb } from "../../components/Breadcrumbs";
import { FaBookOpen, FaList } from "react-icons/fa";
import { setReadingMode } from "../../actions/searchActions";
import ProgramSelect from "../../components/filters/ProgramSelect";
import SourceTypeSelect from "../../components/filters/SourceTypeSelect";
import DownloadExcelButton from "./DownloadExcelButton";

class SearchPracticePage extends Component {
  isReadingMode = () => {
    return this.props.readingMode;
  };

  render() {
    return (
      <>
        <PracticeListingBreadcrumb />
        <Row>
          <Col md="4">
            <FilterSideBar />
          </Col>
          <Col md="8">
            <Row>
              <Col>
                <SearchBar className="mb-2" />
              </Col>
            </Row>
            <Row className="">
              <Col md="4">
                <SourceTypeSelect isMulti className="mb-4" />
              </Col>
              <Col md="4">
                <ProgramSelect isMulti className="mb-4" />
              </Col>
              <Col md="4">
                <div className="mt-4 pt-2 float-right">
                  <DownloadExcelButton />
                  <Button
                    color="primary"
                    outline
                    active={!this.isReadingMode()}
                    onClick={() => this.props.setReadingMode(false)}
                  >
                    <FaList size="1em" />
                  </Button>
                  <Button
                    color="primary"
                    outline
                    active={this.isReadingMode()}
                    onClick={() => this.props.setReadingMode(true)}
                  >
                    <FaBookOpen size="1em" />
                  </Button>
                </div>
              </Col>
            </Row>
            <FilteredPracticeList />
            <div className="float-right">
              <SearchPagination />
            </div>
          </Col>
        </Row>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    readingMode: state.search.readingMode
  };
};
const mapDispatchToProps = {
  setReadingMode
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPracticePage);

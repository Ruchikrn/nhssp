import React, { Component } from 'react'
import {connect} from 'react-redux'

import PagePagination from '../../components/PagePagination';
import { getSearchPaginationState } from '../../selectors';
import { setPage } from '../../actions/searchActions';


class SearchPagination extends Component {
  render() {
    return (
      <PagePagination
        pages={this.props.pages}
        page={this.props.page}
        onPageChange={this.props.onPageChange}
      />
    );
  }
}


const mapStateToProps = (state) => {
  return getSearchPaginationState(state)
}

const mapDispatchToProps = {
  onPageChange: setPage
  
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchPagination);


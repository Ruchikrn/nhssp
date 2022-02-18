import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loadResults} from '../../actions/searchActions'
import { getSearchParams, getSearchResults, getSearchState } from '../../selectors';
import PracticeList from './PracticeList';
import RowLoading from './RowLoading';

class FilteredPracticeList extends Component {
  componentDidMount() {
    this.props.loadResults();
  }
  componentDidUpdate(prevProps) {
    if(this.props.params !== prevProps.params) {
      this.props.loadResults();
    }
  }
  render() { 
    if (this.props.loading) {
      return <RowLoading/>
    }
    else if (this.props.results.length) {
      return (
        <PracticeList data={this.props.results} readingMode={this.props.readingMode}/>
      );
    }
    else {
      return 'कुनै नतिजा फेला परेन। फिल्टरहरू घटाउनुहोस्।'
    }
  }
}

const mapStateToProps = (state) => {
  return {
    loading: getSearchState(state).loading,
    results: getSearchResults(state),
    params: getSearchParams(state),
    readingMode: state.search.readingMode
  };
}
const mapDispatchToProps = {
  loadResults  
}

export default connect(mapStateToProps, mapDispatchToProps)(FilteredPracticeList);
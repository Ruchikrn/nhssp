import React, { Component } from 'react'
import _ from 'lodash'
import { Input} from 'reactstrap';
import { setQ } from '../../actions/searchActions'
import { connect } from 'react-redux'
import { getSearchParams } from '../../selectors';

class SearchBar extends Component {
  state = {
    q: this.props.q
  }
  updateParams = _.debounce(() => {
    this.props.setQ(this.state.q)
  }, 1000
  )
  onChange = event => {
    this.setState({ q: event.target.value })
    this.updateParams()
  }
  render() {
    const {q, setQ, ...rest} = this.props;
    return (
      <Input
        type="search"
        name="search"
        placeholder="खोज..."
        autoComplete="off"
        value={this.state.q}
        onChange={this.onChange} 
        {...rest}/>
    )
  }
}
const mapStateToProps = state => {
  return {
    q: getSearchParams(state).q
  }
}

const mapDispatchToProps = {
  setQ
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

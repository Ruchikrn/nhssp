import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import axios from 'axios';
import { getAuthToken } from '../../../selectors';

// a wrapper component that passes model data to wrapped component
// uses params.id from router match
// the wrapped component can rerequest data (for eg: on update) using props.fetchData passed to it


function withModelData(WrappedComponent, modelPlural, LoadingComponent=null) {
  class ModelComponent extends React.Component {
    state = {
      loading: true,
      data: null
    }

    fetchData = () => {
      this.setState({ loading: true })
      var headers = {}
      if (this.props.authToken) {
        headers = { 'Authorization': `Token ${this.props.authToken}` }
      }
      axios.get(`/api/${modelPlural}/${this.props.match.params.id}/`, { headers })
        .then(res => {
          this.setState({ loading: false, data: res.data })
        })
    }

    componentDidMount() {
      this.fetchData();
    }
    render() {
      if (!this.state.loading) {
        return <WrappedComponent data={this.state.data} fetchData={this.fetchData}/>
      }
      
      if (LoadingComponent !==  null) {
        return <LoadingComponent/>
      }
      return <div>Loading...</div> 
    }
  }

  const mapStateToProps = (state) => {
    return {
      authToken: getAuthToken(state)
    };
  }
  return withRouter(connect(mapStateToProps)(ModelComponent));
}




export default withModelData;
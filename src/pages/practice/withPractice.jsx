import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import axios from 'axios';
import { getAuthToken } from '../../selectors';


function withPractice(WrappedComponent, LoadingComponent=null) {
  class PracticeComponent extends React.Component {
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
      axios.get(`/api/practices/${this.props.match.params.id}/`, { headers })
        .then(res => {
          this.setState({ loading: false, data: res.data })
          console.log(res.data, 'res.data');
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
  return withRouter(connect(mapStateToProps)(PracticeComponent));
}




export default withPractice;
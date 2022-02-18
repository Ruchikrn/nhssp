import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios';
import Button from 'reactstrap';
import { toast } from 'react-toastify';
import { getAuthToken } from '../../../selectors';

class PracticeAction extends Component {
  state = {
    loading: false
  }
  onClick = () => {
    const {data, action, onSuccess, authToken} = this.props;
    const headers = {'Authorization': `Token ${authToken}`}
    axios.post(`/api/practices/${data.id}/${action}/`, {}, {headers})
      .then(res => {
        toast.success("Success")
        this.setState({loading: false})
        onSuccess();
      })
      .catch((res) => {
        console.log(res)
        toast.error("There was an error performing the action")
        this.setState({loading: false})
      })
  }
  render() { 
    return (
      <span onClick={this.onClick}>
        {this.props.children}
      </span>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authToken: getAuthToken(state)
  };
}
export default connect(mapStateToProps)(PracticeAction);
 
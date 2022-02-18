import React, { Component } from 'react'
import { Card } from 'reactstrap'
import { Link } from 'react-router-dom'
import FeaturedItem from './FeaturedItem';


class FeaturedItems extends Component {
  render() {
    return (
      <div className="card-deck">
        {this.props.data.map(practice => <FeaturedItem key={practice.id} data={practice}/>)}
      </div>
    );
  }
}

export default FeaturedItems;
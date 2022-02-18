import React, { Component } from 'react'


class PageSizeDropdown extends Component {
  render() {
    return (
      <form className="form-inline ">
        Show &nbsp;
        <select className="form-control"
          value={this.props.value} onChange={event => this.props.onChange(event.target.value)}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        &nbsp;items
      </form>
    );
  }
}

export default PageSizeDropdown;
import React, { Component } from 'react'


class PageSizeDropdown extends Component {
  render() {
    return (
      <form className="form-inline ">
        Show &nbsp;
        <select className="form-control"
          value={this.props.value} onChange={event => this.props.onChange(event.target.value)}>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        &nbsp;items
      </form>
    );
  }
}

export default PageSizeDropdown;
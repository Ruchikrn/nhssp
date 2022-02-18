import React, { Component } from 'react'
import PracticeRow from './PracticeRow';
import PracticeRowReading from './PracticeRowReading';

class PracticeList extends Component {
  render() {
    const RowComponent = this.props.readingMode ? PracticeRowReading : PracticeRow;
    return (
      <div>
        {this.props.data.map(p => (
          <div className="mb-4" key={p.id}>
            <RowComponent data={p} />
          </div>)
        )}
      </div>
    )

  }
}

export default PracticeList;
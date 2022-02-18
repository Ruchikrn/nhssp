import React, {Component} from 'react'

// If snStart props is passed, it displays SN column
// If a positive value is passed to snStart, it offsets
// the SN. Useful for paginated lists.

class RTable extends Component {
  render() { 
    const {columns, rows, snStart} = this.props;
    const newColumns = snStart >= 0 ? [
      {
        id: 'sn',
        name: 'SN',
        accessor: (row, rowIndex) => this.props.snStart + rowIndex + 1
      }, ...columns] : [...columns]
    return (
      <table className="table table-condensed">
        <thead>
          <tr>
            {newColumns.map(column => <th key={column.id}>{column.name}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => 
            <tr key={row.id}>
              {newColumns.map(column => <td key={column.id}>{column.accessor(row, index)}</td>)}
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}
 
export default RTable;
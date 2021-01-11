import React from 'react'
import TableHeader from './TableHeader'
import TableBody from './TableBody'

const Table = ({ sortColumn, columns, onSort, data }) => {
  return (
    <table className='table'>
      <TableHeader
        sortColumn={sortColumn}
        columns={columns}
        onSort={onSort}
        movies={data}
      />
      <TableBody data={data} columns={columns} />
    </table>
  )
}

export default Table

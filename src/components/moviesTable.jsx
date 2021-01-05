import React, { Component } from 'react'
import TableHeader from './common/TableHeader'
import TableBody from './common/TableBody'
import Like from './like'

class MoviesTable extends Component {
  columns = [
    { path: 'title', label: 'Title' },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    {
      key: 'like',
      content: <Like liked={movie.liked} onClick={() => onLike(movie)} />
    },
    {
      key: 'delete',
      content: (
        <button
          onClick={() => onDelete(movie)}
          className='btn btn-danger btn-sm'
        >
          Delete
        </button>
      )
    }
  ]
  render() {
    const { movies, onDelete, onLike, onSort, sortColumn } = this.props

    return (
      <table className='table'>
        <TableHeader
          sortColumn={sortColumn}
          columns={this.columns}
          onSort={onSort}
        />
        <TableBody
          data={movies}
          onLike={onLike}
          onDelete={onDelete}
          columns={this.columns}
        />
      </table>
    )
  }
}

export default MoviesTable

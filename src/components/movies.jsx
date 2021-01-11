import React, { Component } from 'react'
import MoviesTable from './moviesTable'
import Pagination from './common/pagination'
import ListGroup from './common/ListGroup'
import { paginate } from '../utilts/paginate'
import { getMovies } from '../services/fakeMovieService'
import { getGenres } from '../services/fakeGenreService'
import _ from 'lodash'

class Movies extends Component {
  state = {
    movies: [], //we need empty array here to avoid runtime error
    pageSize: 4,
    genres: [],
    currentPage: 1,
    selectedGenre: '',
    sortColumn: { path: 'title', order: 'asc' }
  }

  componentDidMount() {
    const genres = [{ _id: '', name: 'All genres' }, ...getGenres()]

    this.setState({ movies: getMovies(), genres })
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id)
    this.setState({ movies })
  }

  handleSort = (sortColumn) => {
    this.setState({ sortColumn })
    console.log('sortColumn: ')
    console.log(sortColumn)
  }
  handleLike = (movie) => {
    const movies = [...this.state.movies]
    const index = movies.indexOf(movie)
    movies[index] = { ...movies[index] }
    movies[index].liked = !movies[index].liked
    this.setState({ movies })
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page })
  }

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 })
    console.log(genre)
  }

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn
    } = this.state

    const filteredMovies =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies
    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    )
    const movies = paginate(sortedMovies, currentPage, pageSize)

    return { totalCount: filteredMovies.length, data: movies }
  }

  render() {
    const { length: count } = this.state.movies
    const { pageSize, currentPage, sortColumn } = this.state

    if (count === 0) return <p>There are no movies in the database.</p>

    const { totalCount, data: movies } = this.getPagedData()

    return (
      <div className='row'>
        <div className='col-md-3 col-sm-12'>
          <ListGroup
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={this.state.selectedGenre}
          />
        </div>
        <div className='col-md-9 col-sm-12'>
          <p className='mt-2'>Showing {totalCount} movies in the database.</p>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />

          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    )
  }
}

export default Movies

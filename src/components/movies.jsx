import _ from "lodash";
import React from "react";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";

import MoviesTable from "./moviesTable";

import SearchBox from "./common/searchBox";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";

import { paginate } from "../utils/paginate";

import { getGenres } from "../services/genreService";
import { getMovies, deleteMovie } from "../services/movieService";

class Movies extends React.Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ id: "", name: "All Genres" }, ...data];
    const { data: movies } = await getMovies();

    this.setState({ movies, genres });
  }

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleGenreSelect = (genre) => {
    this.setState({
      selectedGenre: genre._id,
      searchQuery: "",
      currentPage: 1,
    });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleDelete = async (id) => {
    const orignalMovies = this.state.movies;

    const movies = orignalMovies.filter((movie) => movie._id !== id);
    this.setState({ movies });

    try {
      await deleteMovie(id);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("This movie has already been deleted.");
      }
      this.setState({ movies: orignalMovies });
    }
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQuery,
      movies: allMovies,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery) {
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre) {
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre);
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, searchQuery, sortColumn } = this.state;

    if (!count) return <p>There are no movies in the Database!</p>;

    const { totalCount, data: movies } = this.getPageData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            genres={this.state.genres}
            selectedGenre={this.state.selectedGenre}
            onGenreSelect={this.handleGenreSelect}
          ></ListGroup>
        </div>
        <div className="col">
          <Link to="/movies/new">
            <button
              style={{ marginBottom: "20px" }}
              className="btn btn-primary"
            >
              New Movies
            </button>
          </Link>
          <p>There are {totalCount} movies in the Database</p>
          <SearchBox
            value={searchQuery}
            onChange={this.handleSearch}
          ></SearchBox>
          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          ></MoviesTable>
          <Pagination
            totalCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          ></Pagination>
        </div>
      </div>
    );
  }
}

export default Movies;

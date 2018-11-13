const files = require('../../utils/files');

let movies;
files.loadMovies(moviesData => movies = moviesData);

const getMovies = () => movies;

const getMovie = movieId  => movies.find(movie => movie.id === movieId);

const newMovie = (movie, callback) => {
  movie.id = `${movies.length + 1}`
  movies.push(movie);

  files.saveMovies(movies, err => callback(err, movies));
};

const updateMovie = (movie, callback) => {
  const movieId = movie.id;
  let moviePosition = movies.findIndex(movieToFind => movieToFind.id === movieId);
  console.log(moviePosition)
  if (moviePosition >= 0) {
    movies[moviePosition] = movie;
  }

  files.saveMovies(movies, err => callback(err, movies));
}

const deleteMovie = (id, callback) => {
  const moviePosition = movies.findIndex(movieToFind => movieToFind.id === id);
  if (moviePosition >= 0) {
    movies.splice(moviePosition, 1)
  }

  files.saveMovies(movies, err => callback(err, movies));
}

const getLikes = () => movies.filter(movie => movie.like === true);


const setLikeMovie = (movieId, likeValue, callback) => {
  const movie = movies.find(movie => movie.id === movieId);
  if (movie) {
    movie.like = likeValue;
  }

  files.saveMovies(movies, err => callback(err, movies));
}
module.exports = {
  getMovie,
  getMovies,
  newMovie,
  updateMovie,
  deleteMovie,
  getLikes,
  setLikeMovie
};
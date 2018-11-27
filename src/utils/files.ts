import {readFile, writeFile} from 'fs';

function loadMovies(callback) {
  const filePath = __dirname + '/../../data/movies.json';
  readFile(filePath, (err, data) => {
    if (err) {
      console.error('Error', err);
      throw Error;
  } else {
      callback(JSON.parse(data.toString()));
    }
  });
}
function saveMovies(movies, callback) {
  const filePath = __dirname + '/../../data/movies.json';
  const moviesJSON = JSON.stringify(movies);
  writeFile(filePath, moviesJSON, err => {
    if (err) {
      console.error('Error', err);
      callback(err);
    } else {
      callback();
    }
  });
}

module.exports = {
  loadMovies,
  saveMovies
};

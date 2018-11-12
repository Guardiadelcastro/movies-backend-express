//// My Code

const express = require('express');
const app = express();
app.use(express.json());
const fs = require('fs');
const filePath = 'data/items.json';

//GET

app.get('/movies:id', (req, res) =>{
  const id = req.params.id;
  const movie = movies.find(movie => movie.id === id)
  res.json(movie)
})

//POST
app.post('/movies', (req, res) => {
  const newMovie = req.body;
  if(Object.keys(newMovie).length === 0) {
    res.status(400).send('Please, send movie info')
  } else {
    console.log(movies);
    newMovie.id = movies.length;
    movies.push(newMovie);
    res.json(newMovie);
  }
})

//PUT
app.put('/movies/:id', (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const movie = movies.find( () => movie.id === id);
  movie.name = body.name;

  
})


//// Begin rest of class code

const filePath = 'data/items.json';

app.use(express.json());

let movies;

function readDB() {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                reject(err);
            } else {
                try {
                    const json = JSON.parse(data.toString().toLowerCase());
                    console.log(json);
                    resolve(json);
                }
                catch {
                    reject('No es un fichero JSON');
                }
            }
        });
    });
}

// GET /movies/search/matrix
// GET /movies/search/title:matrix
// GET /movies/search/director:Yodra
app.get('/movies/search/:textToSearch', (req, res) => {
    const toSearch = req.params.textToSearch.toLowerCase();
    const textToSearch = toSearch.split(':');
    if (textToSearch.length === 2) {
        const fieldToSearch = textToSearch[0];
        const valueToSearch = textToSearch[1];

        const resultMovie = movies.find(movie => movie[fieldToSearch] === valueToSearch);
        res.json(resultMovie);
    } else {
        const valueToSearch = textToSearch[0];
        res.json('Not implemented');
    }
});

app.get('/movies', (req, res) => {
    res.json(movies);
});


// 
// const users = [{
//     id: Math.random(),
//     username: "YodraPambita",
//     age: 28
// }];
// // GET
// app.get('/movies', (req, res) => {
//     res.json(movies);
// });
// 
// GET with ID
// app.get('/movies/:id', (req, res) => {
//   const movieId = req.params.id;
//   const movie = movies.find(movie => movie.id === movieId);
//   res.json(movie);
// });
// app.get('/movies/:title:titleName', (req, res) => {
//     console.log(req.params);
//     const {
//         movieId,
//         movieTitle,
//         directorId
//     } = req.body;
// });

app.listen('3000', () => {
    readDB()
        .then(fileMovies => movies = fileMovies)
        .catch(err => console.error('No se ha podido leer las películas', err));
});
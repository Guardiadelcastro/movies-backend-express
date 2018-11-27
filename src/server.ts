const express = require('express');
const app = express();
const morgan = require('morgan')
const moviesRouter = require('./api/movies');
const port = 3000;

app.use(express.json());
app.use(morgan('combined'))
app.use('/movies', moviesRouter)

app.get('/', (req, res) => {
  res.json({Message: "Welcome to the movies API"});
})

app.listen(port, () => console.log(`Ready on port ${port}!`))

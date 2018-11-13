const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/", (req, res) => {
	res.json(controller.getMovies());
});

router.get("/:id", (req, res) => {
	const movie = controller.getMovie(req.params.id);
	res.json(movie);
});

router.post("/", (req, res) => {
	const movie = req.body;
	controller.newMovie(movie, (err, movies) => {
		if (err) {
			res.error(err);
		} else {
			res.json(movies);
		}
	});
});

router.put("/", (req, res) => {
	const movie = req.body;
	controller.updateMovie(movie, (err, movies) => {
		if (err) {
			res.error(err);
		} else {
			res.json(movies);
		}
	});
});

router.delete("/:id", (req, res) => {
	const id = req.params.id;
	controller.deleteMovie(id, (err, movies) => {
		if (err) {
			res.error(err);
		} else {
			res.json(movies);
		}
	});
});

router.get("/like", (req, res) => {
	res.json(controller.getLikes());
});

router.put('/like/:id', (req, res) => {
    const movieId = req.params.id;
    controller.setLikeMovie(movieId, true, (err, movies) => {
      if (err) {
        res.error(err);
      } else {
        res.json(movies);
      }
    });
  });
  
  router.delete('/like/:id', (req, res) => {
    const movieId = req.params.id
    controller.setLikeMovie(movieId, false, (err, movies) => {
      if (err) {
        res.error(err);
      } else {
        res.json(movies);
      }
    });
  });

module.exports = router;

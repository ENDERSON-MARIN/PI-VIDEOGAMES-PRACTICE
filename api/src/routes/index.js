const { Router } = require("express");
const genres = require("./genres.js");
const videogames = require("./videogames.js");

const router = Router();

router.use("/genres", genres);
router.use("/videogames", videogames);

module.exports = router;

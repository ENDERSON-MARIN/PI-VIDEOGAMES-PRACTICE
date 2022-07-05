const { Router } = require("express");
const genres = require("./genres");
const videogames = require("./videogames");

const router = Router();

router.use("/genres", genres);
router.use("/videogames", videogames);

module.exports = router;

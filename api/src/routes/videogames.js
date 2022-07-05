const { Router } = require("express");
const {
  getAllVideoGamesOrByName,
  getAllVideogamesById,
} = require("../controllers/videogames");
const {
  getVideogamesApi,
  getVideogamesDb,
  getAllGames,
  getVideogamesApiById
} = require("../controllers");

const router = Router();

router.get("/", getAllVideoGamesOrByName);
router.get("/:id", getAllVideogamesById);

module.exports = router;

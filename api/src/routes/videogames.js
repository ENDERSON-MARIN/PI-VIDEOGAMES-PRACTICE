const { Router } = require("express");
const {
  getAllVideoGamesOrByName,
  getAllVideogamesById,
  createVideogame,
  updateVideogame,
  deleteVideogame,
} = require("../controllers/videogames");

const router = Router();

/* Middleware para validar informacion de Videogames */
function validateCreateVideoGame(req, res, next) {
  const {
    name,
    description,
    released,
    rating,
    platforms,
    background_image,
    genres,
  } = req.body;
  // console.log(req.body);
  // console.log(typeof name);//string
  // console.log(typeof description);//string
  // console.log(typeof released);//string
  // console.log(typeof rating);//string
  // console.log(typeof platforms);//object
  // console.log(typeof background_image);//string
  // console.log(typeof genres);//object
  if (
    typeof name !== "string" ||
    typeof description !== "string" ||
    typeof released !== "string" ||
    typeof rating !== "string" ||
    typeof platforms !== "object" ||
    typeof background_image !== "string" ||
    typeof genres !== "object" ||
    name === "" ||
    description === "" ||
    released === "" ||
    rating === "" ||
    platforms === "" ||
    background_image === "" ||
    genres === ""
  ) {
    return res.status(400).json({
      error:
        "All the fields are required!",
    });
  }

  next();
}

router.get("/", getAllVideoGamesOrByName);
router.get("/:id", getAllVideogamesById);
router.post("/", validateCreateVideoGame, createVideogame);
router.put("/:id", updateVideogame);
router.delete("/:id", deleteVideogame);

module.exports = router;

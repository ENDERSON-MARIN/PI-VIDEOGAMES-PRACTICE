const { Videogame, Genre } = require("../db");

const { Op } = require("sequelize");
const {
  getVideogamesApiById,
  getVideogamesApi,
  getVideogamesDb,
  getAllGames,
} = require("./index.js");

/* GET ALL VIDEOGAMES OR FIND BY NAME */

const getAllVideoGamesOrByName = async (req, res) => {
  try {
    const { name } = req.query;
    const allVideogames = await getAllGames();
    if (name) {
      //Find by name to lowercase & takes up to 16 characters
      let videogame = allVideogames
        .filter((v) => v.name.toLowerCase().includes(name.toLowerCase()))
        .slice(0, 16);
      videogame.length
        ? res.status(200).send(videogame)
        : res.status(400).send("Videogame not found");
    } else {
      res.status(200).send(allVideogames);
    }
  } catch (error) {
    res.status(400).send({ errorMsg: error });
  }
};

/* GET ONE VIDEOGAME BY ID FROM DB OR API */

const getAllVideogamesById = async (req, res) => {
  try {
    const { id } = req.params;
    //search from DB
    if (id.length > 7 && typeof id === "string") {
      const gamesDb = await getVideogamesDb();
      const gamesById = gamesDb.find((v) => v.id === id);
      return res.status(200).send(gamesById);
    } else {
      //search from API //
      const gameApiById = await getVideogamesApiById(id);
      return res.status(200).send(gameApiById);
    }
  } catch (err) {
    res.status(400).send({ err: "Videogame not found" });
  }
};

/* CREATE NEW VIDEOGAME IN THE DB */

const CreateVideogame = async (req, res) => {
  try {
    //ME TRAIGO LOS VALORES DEL CUERPO DE LA PETICIÓN.
    const {
      name,
      description,
      released,
      rating,
      platforms,
      background_image,
      genres,
    } = req.body;
    //CREO EL OBJETO DEL NUEVO VIDEOGAME.
    const newVideogame = await Videogame.create({
      name,
      description,
      released,
      rating,
      platforms,
      background_image,
    });
    // BUSCO DENTRO DEL MODELO DE GENEROS CUYOS NOMBRES COINCIDAN CON LOS QUE LES PASO DEL CLIENTE.
    let genresInDB = await Genre.findAll({
      where: {
        name: {
          [Op.in]: genres,
        },
      },
    });
    //AGREGO AL OBJETO DEL NUEVO VIDEO JUEGO LOS GENEROS MEDIANTE EL MÉTODO ADDGENRES
    await newVideogame.addGenres(genresInDB);
    res.status(201).send({
      succMsg: "Videogame Created Successfully!",
    });
  } catch (err) {
    res.status(400).send({ errMsg: err });
  }
};


module.exports = {
  getAllVideoGamesOrByName,
  getAllVideogamesById
}

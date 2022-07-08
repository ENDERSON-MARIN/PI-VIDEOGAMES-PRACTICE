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
    //si el id es mayor a 7 y el tipo de dato es string busco en la base de datos, sino busco en la API
    if (id.length > 7 && typeof id === "string") {
      const gamesDb = await getVideogamesDb();
      const gamesById = gamesDb.find((v) => v.id === id);
      return res.status(200).send(gamesById);
    } else {
      //busco en la API
      const gameApiById = await getVideogamesApiById(id);
      return res.status(200).send(gameApiById);
    }
  } catch (err) {
    res.status(400).send({ err: "Videogame not found" });
  }
};

/* CREATE NEW VIDEOGAME IN THE DB */

const createVideogame = async (req, res) => {
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
  } catch (error) {
    res.status(400).send({ errMsg: error });
  }
};

/* UPDATE VIDEOGAME IN THE DB*/

const updateVideogame = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      released,
      rating,
      platforms,
      background_image,
      genres,
    } = req.body;
    //BUSCO EL VIDEOGAME DENTRO DE LA BASE DE DATOS POR EL ID
    let videogameDb = await Videogame.findOne({
      where: {
        id: id,
      },
    });
    /* ACTUALIZO EL VIDEOGAME CON LOS DATOS QUE ME PASEN POR BODY */
    await videogameDb.update({
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
    //AGREGO LOS GENEROS AL OBJETO DE videogameDb
    await videogameDb.setGenres(genresInDB);
    res.status(200).send(videogameDb);
  } catch (error) {
    res.status(400).send(error);
  }
};

/* DELETE VIDEOGAME IN THE DB */
const deleteVideogame = async (req, res) => {
  try {
    const { id } = req.params;
    const game = await Videogame.findByPk(id);
    if (game === null) {
      return res.status(400).send("Videogame not found!");
    } else {
      await game.destroy();
      return res.send("Videogame deleted Successfully!");
    }
  } catch (error) {
    res.status(400).send({ errMsg: error });
  }
};

module.exports = {
  getAllVideoGamesOrByName,
  getAllVideogamesById,
  createVideogame,
  updateVideogame,
  deleteVideogame,
};

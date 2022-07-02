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

const getAllVideogamesById = async (req, res ) => {
    try{
        const {id} = req.params
         //search from DB
         if(id.length > 7 && typeof id === 'string'){
            const gamesDb = await getVideogamesDb();
            const gamesById = gamesDb.find((v) => v.id === id);
             return res.status(200).send(gamesById)
         }else{//search from API // 
             const gameApiById = await getVideogamesApiById(id);
             return res.status(200).send(gameApiById);
         }
    } catch(err){
        res.status(400).send( {err: "Videogame not found"});
    }
};



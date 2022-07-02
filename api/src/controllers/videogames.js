const { Videogame, Genre } = require("../db");

const { Op } = require("sequelize");
const {
  getVideogamesApiById,
  getVideogamesApi,
  getVideogamesDb,
  getAllGames,
} = require("./index.js");



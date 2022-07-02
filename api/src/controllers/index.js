const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;

/* GET VIDEOGAMES FROM THE API */

const getVideogamesApi = async () => {
  try {
    const videogames = [];
    let callApi = `https://api.rawg.io/api/games?key=${API_KEY}`;
    for (let i = 1; i <=7; i++) {
      let gamesPaginated = await axios.get(callApi);
      gamesPaginated.data?.results.forEach((e) => {
        videogames.push({
          id: e.id,
          name: e.name,
          rating: e.rating,
          released: e.released,
          background_image: e.background_image,
          genres: e.genres.map((genre) => genre.name),
          platforms: e.platforms.map((platform) => platform.platform.name),
        });
      });
      callApi = gamesPaginated.data.next;
    }
    return videogames;
  } catch (err) {
    console.log(err);
  }
};
/* GET VIDEOGAMES FROM THE DB */

const getVideogamesDb = async () => {
  try{
  const gamesDb = await Videogame.findAll({
      where: {},
      include: {
          model: Genre,
          attributes: ['name'],
      }
  })

  const gamesByGenres = gamesDb.map((g) => {
     return{
          id: g.dataValues.id,
          name: g.dataValues.name,
          rating: g.dataValues.rating,
          released: g.dataValues.released,
          background_image: g.dataValues.background_image,
          genres: g.dataValues.genres.map((g) => g.dataValues.name),
          platforms: g.dataValues.platforms,
          description: g.dataValues.description,
          
      }
  })
  return gamesByGenres;

  }catch(err){
      console.log(err);
  }
};




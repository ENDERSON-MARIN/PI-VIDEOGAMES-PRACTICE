const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;

/* GET VIDEOGAMES FROM THE API */

const getVideogamesApi = async () => {
  try {
    const videogames = [];
    let callApi = `https://api.rawg.io/api/games?key=${API_KEY}`;
    for (let i = 1; i <= 7; i++) {
      let gamesPaginated = await axios.get(callApi);
      gamesPaginated.data?.results.forEach((e) => {
        videogames.push({
          id: e.id,
          name: e.name,
          rating: e.rating,
          released: e.released,
          image: e.background_image,
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
  try {
    const gamesDb = await Videogame.findAll({
      where: {},
      include: {
        model: Genre,
        attributes: ["name"],
      },
    });

    const gamesWithGenres = gamesDb.map((g) => {
      return {
        id: g.dataValues.id,
        name: g.dataValues.name,
        rating: g.dataValues.rating,
        released: g.dataValues.released,
        image: g.dataValues.background_image,
        genres: g.dataValues.genres.map((g) => g.dataValues.name),
        platforms: g.dataValues.platforms,
        description: g.dataValues.description,
      };
    });
    return gamesWithGenres;
  } catch (err) {
    console.log(err);
  }
};

/* GET ALL VIDEOGAMES FROM API AND DB */

const getAllGames = async () => {
  try{
      const gamesApi = await getVideogamesApi();
      const gamesDb = await getVideogamesDb();
      const allGames = [...gamesApi, ...gamesDb];
      // console.log( `all games = ${allGames}`)
      return allGames;
  }catch(err){
      console.log(err);
  }
};

/* GET ONE VIDEOGAME API BY ID  */

const getVideogamesApiById = async (id) => {
  try{
      const game = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
      const videogame = {
          id: game.data.id,
          name: game.data.name,
          rating: game.data.rating,
          released: game.released,
          image: game.data.background_image,
          genres: game.data.genres.map(g => g.name),
          platforms: game.data.parent_platforms.map(p => p.platform.name),
          description: game.data.description,
      };
      return videogame;

  } catch(err){
      console.log(err);
  }
};

/* GET GENRES FROM API AND STORE IN DB */

const getGenresApiDb = async () => {
  try{
      const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)

      const genresApiName = genresApi.data.results.map((g) => {
        return { name : g.name };
      }) 
      let genresDb = await Genre.findAll();
      if (genresDb.length === 0) {
          await Genre.bulkCreate(genresApiName)
      }
  }catch (err){
      console.log(err);
  }
};

/* GET ALL GENRES FROM DB */

const getGenresFromDb = async () =>{
  try{
      let genresFromDb = await Genre.findAll();
      genresFromDb = genresFromDb.map(g => g.toJSON());
      return genresFromDb;

  }catch(err){
      console.log(err)
  }
};

module.exports = {
  getVideogamesApi,
  getVideogamesDb,
  getAllGames,
  getVideogamesApiById,
  getGenresApiDb,
  getGenresFromDb
}

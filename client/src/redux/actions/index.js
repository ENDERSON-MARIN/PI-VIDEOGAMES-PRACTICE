import axios from "axios";
import {
  GET_ALL_VIDEOGAMES,
  CREATE_VIDEOGAME,
  UPDATE_VIDEOGAME,
  DELETE_VIDEOGAME,
  GET_VIDEOGAMES_BY_NAME,
  GET_VIDEOGAMES_BY_ID,
  GET_ALL_GENRES,
  FILTER_BY_GENRES,
  FILTER_BY_EXISTENCE,
  ORDER_BY_ALPHABETICAL,
  ORDER_BY_RATING,
} from "./types";

/* GET ALL VIDEOGAMES */

export function getAllVideogames() {
  return async function (dispatch) {
    try {
      const videogames = await axios.get("/videogames");
      return dispatch({
        type: GET_ALL_VIDEOGAMES,
        payload: videogames.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

/* CREATE NEW VIDEOGAME */

export function createVideogame(body) {
  return async function (dispatch) {
    try {
      const newGame = await axios.post("/videogames", body);
      console.log(newGame);
      return dispatch({
        type: CREATE_VIDEOGAME,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

/* UPDATE VIDEOGAME */

export function updateVideogame(id, body) {
  return async function (dispatch) {
    try {
      await axios.put(`/videogame/${id}`, body);
      return dispatch({
        type: UPDATE_VIDEOGAME,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

/* DELETE VIDEOGAME */

export function deleteVideogame(id) {
  return async function (dispatch) {
    try {
      await axios.delete(`/videogame/${id}`);
      return dispatch({
        type: DELETE_VIDEOGAME,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

/* GET VIDEOGAMES BY NAME */

export function getVideogamesByName(name) {
  return async function (dispatch) {
    try {
      const gamesName = await axios.get(`/videogames?name=${name}`);
      return dispatch({
        type: GET_VIDEOGAMES_BY_NAME,
        payload: gamesName.data,
      });
    } catch (error) {
      return alert(`The videogame name ${name} not found!`);
    }
  };
}

/* GET VIDEOGAMES BY ID */

export function getVideogamesById(id) {
  return async function (dispatch) {
    try {
      const gameId = await axios.get(`/videogames/${id}`);
      return dispatch({
        type: GET_VIDEOGAMES_BY_ID,
        payload: gameId.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

/* GET VIDEO GAMES BY GENRES */

export function getVideogamesByGenres() {
  return async function (dispatch) {
    try {
      gamesGenres = await axios.get("/genres");
      return dispatch({
        type: GET_ALL_GENRES,
        payload: gamesGenres.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

/* FILTER VIDEOGAMES BY GENRES */

export function filterVideogamesByGenres(genres, status) {
  return {
    type: FILTER_BY_GENRES,
    payload: { genres, status },
  };
}

/* FILTER VIDEOGAMES BY EXISTENCE */

export function filterVideogamesByExistence(existence) {
  return {
    type: FILTER_BY_EXISTENCE,
    payload: existence,
  };
}

/* ORDER VIDEOGAMES BY ALPHABETICAL */

export function orderVideogamesByAlphabetical(ordering) {
  return {
    type: ORDER_BY_ALPHABETICAL,
    payload: ordering,
  };
}

/* ORDER VIDEOGAMES BY RATING */

export function orderVideogamesByRating(rating) {
  return {
    type: ORDER_BY_RATING,
    payload: rating,
  };
}

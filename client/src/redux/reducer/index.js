/* Importo los actions types */
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
} from "../actions/types";

/* Importo las funciones de filtrado y ordenamiento */
import {
  filterByExistence,
  filterByGenres,
  orderByAlphabetic,
  orderByRating,
} from "./filters";

/* creo el estado inicial de la app */
const initialState = {
  videogames: [],
  videogamesCopy: [],
  videogamesApi: [],
  videogamesDb: [],
  genres: [],
  videogameDetail: [],
};

/* creo la funcion reducer */

function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_ALL_VIDEOGAMES:
      return {
        ...state,
        videogames: payload,
        videogamesCopy: payload,
        videogameDetail: payload,
        videogamesApi: filterByExistence("API", payload),
        videogamesDb: filterByExistence("DB", payload),
      };
    case CREATE_VIDEOGAME:
      return {
        ...state,
      };
    case UPDATE_VIDEOGAME:
      return {
        ...state,
      };
    case DELETE_VIDEOGAME:
      return {
        ...state,
      };
    case GET_VIDEOGAMES_BY_NAME:
      return {
        ...state,
        videogamesCopy: payload,
      };
    case GET_VIDEOGAMES_BY_ID:
      return {
        ...state,
        videogameDetail: payload,
      };
    case GET_ALL_GENRES:
      return {
        ...state,
        genres: payload,
      };
    case FILTER_BY_GENRES:
      return {
        ...state,
        videogamesCopy: filterByGenres(
          payload["genres"],
          payload["existence"] === "API"
            ? state.videogamesApi
            : payload["existence"] === "DB"
            ? state.videogamesDb
            : state.videogames
        ),
      };
    case FILTER_BY_EXISTENCE:
      return {
        ...state,
        videogamesCopy: filterByExistence(payload, state.videogames),
      };
    case ORDER_BY_ALPHABETICAL:
      return {
        ...state,
        videogamesCopy: orderByAlphabetic(payload, state.videogames),
      };
    case ORDER_BY_RATING:
      return {
        ...state,
        videogamesCopy: orderByRating(payload, state.videogames),
      };

    default:
      return state;
  }
}

export default rootReducer;

/* FUNCIONES PARA EL FILTRADO Y ORDENAMIENTO */

export const filterByExistence = (existence, arrayGames) => {
  switch (existence) {
    case "API":
      return arrayGames.filter((game) => typeof game.id === "number");
    case "DB":
      return arrayGames.filter((game) => typeof game.id === "string");
    default:
      return arrayGames;
  }
};

export const filterByGenres = (genres, arrayGames) => {
  return arrayGames.filter((game) => game.genres.includes(genres));
};

export const orderByAlphabetic = (order, arrayGames) => {
  switch (order) {
    case "A-Z":
      return arrayGames.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    case "Z-A":
      return arrayGames.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    default:
      return arrayGames;
  }
};

export const orderByRating = (rating, arrayGames) => {
  switch (rating) {
    case "Higth":
      return arrayGames.sort((a, b) => {
        if (a.rating > b.rating) return -1;
        if (b.rating > a.rating) return 1;
        else return 0;
      });
    case "Lower":
      return arrayGames.sort((a, b) => {
        if (a.rating > b.rating) return 1;
        if (b.rating > a.rating) return -1;
        else return 0;
      });
    default:
      return arrayGames;
  }
};

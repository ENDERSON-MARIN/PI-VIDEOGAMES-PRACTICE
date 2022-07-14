import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Style from "./Home.module.css";
import NavBar from "../NavBar/NavBar";
import VideogameCard from "../VideogameCard/VideogameCard";
import Pagination from "./Pagination/Pagination";
import Loader from "../Loader/Loader";


//---Import Actions--//
import {
  getAllVideogames,
  getVideogamesByGenres,
  filterVideogamesByExistence,
  filterVideogamesByGenres,
  orderVideogamesByAlphabetical,
  orderVideogamesByRating,
  getVideogamesByName,
} from "../../redux/actions/index";

const Home = () => {
  const [, /*refresh*/ setRefresh] = useState(false);
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogamesCopy);
  const genres = useSelector((state) => state.genres);
  const [status, setStatus] = useState("All");
  const [loader, setLoader] = useState(true);

  //---Pagination ---//
  const [currentPage, setCurrentPage] = useState(1); // set page to 1
  const [gamesPerPage, setGamesPerPage] = useState(15); // shows 15 games
  const lastIndex = currentPage * gamesPerPage; // 15
  const firstIndex = lastIndex - gamesPerPage; // 0
  const currentGames = allVideogames?.slice(firstIndex, lastIndex); //takes a part of the array

  const pagination = (pageNum) => {
    setCurrentPage(pageNum); //set the page
  };

  useEffect(() => {
    dispatch(getAllVideogames());
    dispatch(getVideogamesByGenres());
  }, [dispatch]);

  //--FILTER BY EXISTENCE-->ALL-API-DB
  const handleFilterExistence = (e) => {
    setStatus(e.target.value);
    dispatch(filterVideogamesByExistence(e.target.value));
    setCurrentPage(1);
    setRefresh((prevState) => !prevState); // refresh
  };

  //--FILTER BY ALPHABETICAL-->A-Z/Z-A
  const handleOrderByAlphabetical = (e) => {
    setStatus(e.target.value);
    dispatch(orderVideogamesByAlphabetical(e.target.value));
    setCurrentPage(1);
    setRefresh((prevState) => !prevState); // refresh
  };

  //--FILTER BY RATING-->HIGTH/LOW
  const handleOrderByRating = (e) => {
    setStatus(e.target.value);
    dispatch(orderVideogamesByRating(e.target.value));
    setCurrentPage(1);
    setRefresh((prevState) => !prevState); // refresh
  };
  //--FILTER BY GENRE (search by genre)
  const handleFilterGenre = (e) => {
    dispatch(filterVideogamesByGenres(e.target.value, status)); //gets the value and the status
    setCurrentPage(1);
    setRefresh((prevState) => !prevState); // refresh
  };

  const handleSearch = (value) => {
    dispatch(getVideogamesByName(value));
    setCurrentPage(1);
  };

  const handleReloadBtn = () => {
    window.location.reload();
  };

  if (currentPage && loader) {
    setLoader(false);
  }
  return (
    <>
      <NavBar onSearch={handleSearch} />
      <main>
        <div>
          <div>
            <div className={Style.selectContainer}>
              <div className={Style.box}>
                <select onChange={handleFilterGenre} name="Genres">
                  <option value="Filter by Genres" selected disabled>
                    {" "}
                    FILTER BY GENRES
                  </option>
                  {genres.map((g) => {
                    return (
                      <option key={g.id} value={g.name}>
                        {g.name}
                      </option>
                    );
                  })}
                </select>
                <select onChange={(e) => handleFilterExistence(e)}>
                  <option value="Filterby" selected disabled>
                    {" "}
                    FILTER BY EXISTENCE{" "}
                  </option>
                  <option value="All">All</option>
                  <option value="API">API</option>
                  <option value="DB">DB</option>
                </select>

                <select onChange={handleOrderByAlphabetical} name="Genre">
                  <option value="Sortby" selected disabled>
                    {" "}
                    ORDER BY ALPHABETIC{" "}
                  </option>
                  <option value="A-Z"> A-Z </option>
                  <option value="Z-A"> Z-A </option>
                </select>
                <select onChange={handleOrderByRating}>
                  <option value="Rating" selected disabled>
                    {" "}
                    ORDER BY RATING{" "}
                  </option>
                  <option value="Higth">HIGTH⬆</option>
                  <option value="Lower">LOW⬇</option>
                </select>
              </div>
            </div>
            <div className={Style.paginationBox}>
              <Pagination
                className="pagination"
                gamesPerPage={gamesPerPage}
                allVideogames={allVideogames.length}
                onPage={pagination}
              />
            </div>
            <div className={Style.reloadBtnContainer}>
              <button
                data-text="Reload"
                className={Style.reloadBtn}
                onClick={handleReloadBtn}
              >
                <span className={Style.hoverText} aria-hidden="true">
                  &nbsp;reload&nbsp;
                </span>
              </button>
            </div>
            <section className={Style.contentWrapper}>
              {currentGames.length > 0 && !loader ? (
                currentGames.map((g) => {
                  return (
                    <VideogameCard
                      key={g.id}
                      id={g.id}
                      name={g.name}
                      background_image={g.background_image}
                      genres={g.genres}
                      rating={g.rating}
                    />
                  );
                })
              ) : !currentGames && loader ? (
                <h1>Carga el loader!!</h1>
              ) : (
                <Loader/>
              )}
            </section>
          </div>
        </div>
      </main>
    </>
  );
};
export default Home;

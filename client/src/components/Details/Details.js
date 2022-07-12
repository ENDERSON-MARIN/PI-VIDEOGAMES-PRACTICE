import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getVideogamesById } from "../../redux/actions/index";
import Loader from "./Loader";
import styles from "./Details.module.css";

export default function Details() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const videogamesDetail = useSelector((state) => state.videogameDetail);

  useEffect(() => {
    dispatch(getVideogamesById(id));
  }, [dispatch, id]);

  return (
    <div>
      <nav className={styles.nav}>
        <Link to="/home">
          <button className={styles.button}>Home</button>
        </Link>
      </nav>
      <div>
        <div className={styles.containerTotal}>
          <div className={styles.container}>
            {videogamesDetail.name ? (
              <div>
                <img
                  src={videogamesDetail.image}
                  alt="no flag founded"
                  className={styles.img}
                />
                <h2>🎮 {videogamesDetail.name} 🎮</h2>
                <p>Rating: {videogamesDetail.rating}</p>
                <p className={styles.temp}>Genres: {videogamesDetail.genres}</p>
              </div>
            ) : (
              <div>
                <Loader />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

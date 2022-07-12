import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideogamesByGenres,
  createVideogame,
} from "../../redux/actions/index";
import { Link, useHistory } from "react-router-dom";
import styles from "./CreateVideogame.module.css";
import Swal from "sweetalert2";

export default function CreateVideogame() {
  const dispatch = useDispatch();
  const history = useHistory();
  const videogamesCopy = useSelector((state) => state.videogamesCopy);
  const allGenres = useSelector((state) => state.genres);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    released: "",
    rating: "",
    background_image: "",
    description: "",
    platforms: [],
    genres: [],
  });

  //Validaciones
  function validate(input) {
    const existeName = videogamesCopy.filter(
      (e) => e.name.toLowerCase() === input.name.toLowerCase()
    );
    console.log(existeName);
    let errors = {};
    if (!input.name) {
      errors.name = "Name is required";
    } else if (input.name.length < 3) {
      errors.name = "The name is invalid";
    } else if (!input.name.match(/^[A-Za-z]+$/)) {
      errors.name = "Name of videogame must contain only letters";
    } else if (existeName.length > 0) {
      errors.name = "videogame name already exists";
    }

    return errors;
  }

  useEffect(() => {
    dispatch(getVideogamesByGenres());
  }, [dispatch]);

  let Platforms = [
    "PC",
    "PlayStation",
    "Xbox",
    "Nintendo Switch",
    "iOS",
    "Android",
    "Nintendo",
    "PS Vita",
    "PSP",
    "Wii",
    "GameCube",
    "Game Boy",
    "SNES",
    "NES",
    "Commodore",
    "Atari",
    "Genesis",
    "SEGA",
    "Dreamcast",
    "3DO",
    "Jaguar",
    "Game Gear",
    "Neo Geo",
    "PS5",
    "PS4",
    "PS3",
    "PS2",
    "PS1",
  ];

  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
    setErrors(validate({ ...input, [e.target.name]: e.target.value }));
  }

  function handleSumbit(e) {
    e.preventDefault();
    if (
      !input.name ||
      !input.released ||
      !input.rating ||
      !input.background_image ||
      !input.description ||
      !input.platforms === 0 ||
      !input.genres === 0
    ) {
      Swal.fire("Complete all fields");
    } else if (errors.name) {
      Swal.fire("incorrect data");
    } else {
      setErrors(validate(input));
      dispatch(createVideogame(input));
      Swal.fire("Videogame created succesfully!");
      setInput({
        name: "",
        released: "",
        rating: "",
        background_image: "",
        description: "",
        platforms: [],
        genres: [],
      });
      document.getElementById("form").reset();
      history.push("/home");
    }
  }

  function handleSelect(e) {
    if (Object.values(input.genres).includes(e.target.value)) {
      alert("duplicate Genres");
    } else {
      setInput({
        ...input,
        genres: [...input.genres, e.target.value],
      });
    }
  }

  function handleDelete(e) {
    setInput({
      ...input,
      genres: input.genres.filter((g) => g !== e),
    });
  }

  function handlePlatforms(e) {
    console.log(e.target.value);
    if (e.target.checked) {
      setInput({
        ...input,
        platforms: [...input.platforms, e.target.value],
      });
    } else if (!e.target.checked) {
      setInput({
        ...input,
        platforms: input.platforms.filter((p) => p !== e.target.value),
      });
    }
  }

  return (
    <div>
      <nav className={styles.nav}>
        <Link to="/home">
          <button className={styles.buttonhome}>HOME</button>
        </Link>
      </nav>
      <div className={styles.containerTotal}>
        <div className={styles.container}>
          <h2 className={styles.title}>CREATE VIDEOGAME</h2>
          <form onSubmit={(e) => handleSumbit(e)} className={styles.form} id="form">
            <div>
              <label>Name:</label>
              <input
                type="text"
                placeholder="Videogame name"
                value={input.name}
                name="name"
                onChange={(e) => handleChange(e)}
                className={styles.input}
              />
              {errors.name && <p className={styles.error}>{errors.name}</p>}
            </div>
            <div>
              <label>Image:</label>
              <input
                type="url"
                placeholder="enter image url"
                value={input.image}
                name="background_image"
                onChange={(e) => handleChange(e)}
                className={styles.input}
              />
            </div>
            <div>
              <label>Released Date:</label>
              <input
                type="date"
                placeholder="Date Released"
                value={input.released}
                name="released"
                onChange={(e) => handleChange(e)}
                className={styles.input}
              />
              {errors.height_min && (
                <p className={styles.error}>{errors.height_min}</p>
              )}
            </div>
            <div>
              <label>Rating:</label>
              <input
                type="number"
                placeholder="Rating Videogame"
                value={input.rating}
                name="rating"
                onChange={(e) => handleChange(e)}
                className={styles.input}
              />
            </div>
            <div>
              <label>Description:</label>
              <input
                type="text"
                placeholder="Description Videogame"
                value={input.description}
                name="description"
                onChange={(e) => handleChange(e)}
                className={styles.input}
              />
            </div>

            {/* Platforms */}
            <div>
              <label className={styles.container}> PLATFORMS: </label>
              <div className={styles.align}>
                {Platforms.map((e) => (
                  <div key={e} className="platforms-form">
                    <input
                      className={styles.input}
                      type="checkbox"
                      name="platforms"
                      value={e}
                      key={e}
                      onClick={(e) => handlePlatforms(e)}
                    />
                    <span className={styles.nameGenre} name="platforms">
                      {" "}
                      {e}{" "}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/* genres */}
            <div>
              <label>Genres: </label>
              <select
                onChange={(e) => handleSelect(e)}
                className={styles.input}
              >
                <option hidden>All Genres</option>
                {allGenres.map((e) => (
                  <option key={e.id} value={e.name}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>
            {input.genres.map((e) => (
              <div key={e} className={styles.elements2}>
                <p className={styles.element}>
                  {e}
                  <button
                    type="button"
                    onClick={() => handleDelete(e)}
                    className={styles.buttonX}
                  >
                    x
                  </button>
                </p>
              </div>
            ))}

            <div className={styles.divbutton}>
              <button type="submit" className={styles.button}>
                CREATE
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

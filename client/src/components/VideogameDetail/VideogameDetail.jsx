import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Style from "./VideogameDetail.module.css";

import { deleteVideogame, getVideogamesById } from "../../redux/actions/index";

import CardDetail from "./CardDetail.jsx";

const VideogameDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const videogameDetails = useSelector((state) => state.videogameDetail);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getVideogamesById(id));
    // console.log(id)
  }, [dispatch, id]);

  const handleDelete = () => {
    dispatch(deleteVideogame(id));
    alert("Game deleted successfully");
    // console.log(id)
    navigate("/home");
  };

//   console.log(videogameDetails);

  return (
    <div>
      <div className={Style.btncontainer}>
        {typeof videogameDetails.id === "string" && (
          <button className={Style.backBtn} onClick={handleDelete}>
            {" "}
            <span className={Style.buttonTop}>DELETE</span>
          </button>
        )}
        <NavLink to="/home">
          <button className={Style.backBtn}>
            <span className={Style.buttonTop}>BACK HOME</span>
          </button>
        </NavLink>
        {typeof videogameDetails.id === "string" && (
          <NavLink to={`/videogames/${id}`}>
            <button className={Style.backBtn}>
              <span className={Style.buttonTop}>UPDATE</span>
            </button>
          </NavLink>
        )}
      </div>

      <div className={Style.container}>
        <CardDetail game={videogameDetails} />
      </div>
    </div>
  );
};
export default VideogameDetail;

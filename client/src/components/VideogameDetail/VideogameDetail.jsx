import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Style from "./VideogameDetail.module.css";

import { deleteVideogame, getVideogamesById } from "../../redux/actions/index";

import CardDetail from "./CardDetail.jsx";

import Swal from "sweetalert2";

const VideogameDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const gameDetails = useSelector((state) => state.videogameDetail);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getVideogamesById(id));
    console.log(id);
  }, [dispatch, id]);

  const handleDelete = () => {
    Swal.fire({
      title: "Do you want to delete the video game?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "green",
      denyButtonText: "Cancel",
      timer: "3000",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteVideogame(id));
        Swal.fire("Video game successfully removed!", "", "success");
        navigate("/home");
      } else if (result.isDenied) {
        //Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  //console.log(gameDetails);

  return (
    <div>
      <div className={Style.btncontainer}>
        <NavLink to="/home">
          <button className={Style.backBtn}>
            <span className={Style.buttonTop}>GO BACK HOME</span>
          </button>
        </NavLink>
        {typeof gameDetails.id === "string" && (
          <NavLink to={`/videogameUpdate/${id}`}>
            <button className={Style.backBtn}>
              <span className={Style.buttonTop}>UPDATE VIDEOGAME</span>
            </button>
          </NavLink>
        )}
        {typeof gameDetails.id === "string" && (
          <button className={Style.backBtn} onClick={handleDelete}>
            {" "}
            <span className={Style.buttonTop}>DELETE VIDEOGAME</span>
          </button>
        )}
      </div>

      <div className={Style.container}>
        <CardDetail game={gameDetails} />
      </div>
    </div>
  );
};
export default VideogameDetail;

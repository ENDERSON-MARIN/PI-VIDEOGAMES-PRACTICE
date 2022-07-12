import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideogames } from "../../redux/actions";

function Home() {
  let videogames = useSelector((state) => state.videogames);
  //console.log(videogames);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllVideogames());
  }, [dispatch]);
  console.log(videogames);
  return (
    <div>
      <h1>Home Component</h1>
    </div>
  );
}

export default Home;

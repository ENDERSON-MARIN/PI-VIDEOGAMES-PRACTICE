import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideogames } from "../../redux/actions";



/* COMPONENTS */
import Loader from "../Loader/Loader";
import Paginated from "../Paginate/Paginated";
import SearchBar from "../Searchbar/SearchBar";
import CreateVideogame from "../Forms/CreateVideogame";


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
      <SearchBar />
      <Paginated />
      <Loader />
      <CreateVideogame/>
    </div>
  );
}

export default Home;

import React from "react";
import { Link } from "react-router-dom";
import Style from './VideogameCard.module.css'

//--HOME CARDS
const VideogameCard = ({ id, name, background_image, genres, rating }) => {

return (

    <section className={Style.card}> 
      <section className={Style.card2}> 
     <Link to={`/videogames/${id}`}>
      <img className={Style.img}src={background_image} alt={name}/>
     </Link>
      
    
     <h2 className={Style.cardName}> {name.toUpperCase()} </h2> 
    <h3 className={Style.cardRating}>RATING {rating}⭐</h3>
    <h3 className={Style.cardGenres}>GENRES {genres && genres.map((e) => {
          return(
            <div className={Style.genres}key={e}>{e},</div> 
          )
        })}</h3>
       
      
    </section>
   
  </section>

  
)
}
export default VideogameCard;
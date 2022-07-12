import React from 'react'
import {Link} from 'react-router-dom'
import styles from './Cards.module.css'

export default function Cards({id,name, image, rating, genres}) {
    return (
        <div>
            <img src={image} alt='image-videogames' className={styles.img}/>
            <h4 className={styles.text}>{name}</h4>
            <p className={styles.paf}>Rating:{rating} kg</p>
            <p className={styles.paf}>Genres: {genres}</p>
            <div className={styles.paf2}>
            <Link to={`/videogames/${id}`}><button className={styles.button}>View Details</button></Link>
            </div>
        </div>
    )
}

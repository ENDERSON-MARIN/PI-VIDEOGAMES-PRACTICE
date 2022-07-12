import React from 'react'
import styles from './Loader.module.css'

import loaderImage from "../../images/loading_green.gif";

export default function Loader() {
    return (
        <div>
             <img className={styles.loader}src={loaderImage} alt='loader-image'/>
             <p className={styles.msg}>Loading please wait...</p>
     </div>
    )
}
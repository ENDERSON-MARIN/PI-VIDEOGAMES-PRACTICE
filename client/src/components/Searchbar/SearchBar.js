import {React, useState} from 'react'
import {useDispatch} from 'react-redux'
import { getVideogamesByName } from '../../redux/actions/index'
import styles from './SearchBar.module.css'
import Swal from 'sweetalert2'


export default function SearchBar({setCurrentPage}) {
    const dispatch = useDispatch()
    const [name, setName]= useState('')
    
    function handleInputChange(e){
        setName(e.target.value)
    }

    function hundleSubmit(e){
        if(name.length < 3) {
            Swal.fire('Enter the name of the game!')
        } else {
        e.preventDefault()
        dispatch(getVideogamesByName(name))
        setName('')
        setCurrentPage(1)
        }
    }

    return (
        <div>
            <input type='text' placeholder='Find your Videogame by name' value={name} onChange={(e) => handleInputChange(e)} className={styles.input}/>
            <button type= 'submit' onClick={(e) => hundleSubmit(e)} className={styles.button}>Search 🔍</button>
        </div>
    )
}
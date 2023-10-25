import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import css from '../style.module.css'
import { MoviesList } from 'components/MoviesList/MoviesList'
const HomePage = () => {
    const [popularFilm, setPopularFilm] = useState([])
    const location = useLocation()


    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/trending/all/day',
            params: { language: 'en-US' },
            headers: {
                accept: 'application/json',
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTViYjNiYmJjNjI3MzhiNGE5NDcyN2Q4OGQ2N2I5ZSIsInN1YiI6IjY1MjdhNDJjODEzODMxMDExYjQ5MWJlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4SUgvkJ2_ZKVAH1mFvbYnJX5d7g63SF1OquXIcFrp9c',
            },
        };

        const fetchPopularMovies = async () => {
            try {
                let response = await axios.request(options);
                setPopularFilm(response.data.results);
                console.log(response.data.results);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPopularMovies();
    }, []);
    return (
        <div>
            <h1>List of popular movies</h1>
            {popularFilm.length > 0 && <MoviesList location={location} movies={popularFilm} />}
        </div >
    )

}








export default HomePage

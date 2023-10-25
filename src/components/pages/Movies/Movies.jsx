import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios';
import { ReactComponent as IconSearch } from './icon/search.svg'
import { useLocation, useSearchParams } from 'react-router-dom'
import { MoviesList } from 'components/MoviesList/MoviesList';
const Movies = () => {
    const [searchParams, setsearchParams] = useSearchParams()
    const [movies, setMovies] = useState([])



    const query = searchParams.get('query')

    const makeRequest = useCallback((query) => {
        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/search/movie',
            params: {
                include_adult: 'false',
                language: 'en-US',
                page: '1',
                query: query,
            },
            headers: {
                accept: 'application/json',
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MDRmZTdlM2QwYTY5MzA2MzQ4ZTUxN2YyMWM3MGE3OSIsInN1YiI6IjY1Mjk3NjQzMGNiMzM1MTZmNWM4YjEwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.whmYYKhT_uILl9fMGb9Rclq5CcbbJVNJVKSFUVsEDto',
            },
        };

        axios
            .request(options)
            .then(response => {
                setMovies(response.data.results);
                console.log(response.data.results);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        makeRequest(query)
    }, [query, makeRequest])

    const handelFormSubmit = (event) => {
        event.preventDefault()
        setsearchParams({ query: event.target.elements.searchMovie.value })
    }

    return (
        <div>
            <h1>Search for movies by keyword</h1>
            <form onSubmit={handelFormSubmit}>
                <label>
                    <p> Search movie</p>
                    <input type='text' name='searchMovie' required />
                </label>
                <button type='submit'>Search <IconSearch /></button>
            </form>
            {movies.length > 0 && <MoviesList movies={movies} />}
        </div>
    )
}

export default Movies

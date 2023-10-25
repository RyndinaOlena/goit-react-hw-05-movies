import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { useParams, Outlet } from 'react-router-dom';
import css from '../style.module.css';
import { useRef } from 'react';

const MovieDetails = () => {
    const [movieDetails, setMovieDetails] = useState(null);
    const [error, setError] = useState(null);
    const { movieId } = useParams();

    const location = useLocation()
    console.log(location)
    const backLinkRef = useRef(location?.state.from ?? '/')



    console.log(useParams())

    const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w300/';
    useEffect(() => {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${movieId}`,
            params: { language: 'en-US' },
            headers: {
                accept: 'application/json',
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTViYjNiYmJjNjI3MzhiNGE5NDcyN2Q4OGQ2N2I5ZSIsInN1YiI6IjY1MjdhNDJjODEzODMxMDExYjQ5MWJlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4SUgvkJ2_ZKVAH1mFvbYnJX5d7g63SF1OquXIcFrp9c',
            },
        };


        axios
            .request(options)
            .then(response => {
                setMovieDetails(response.data);
                console.log(response.data);
            })
            .catch(error => {
                setError(error.message);
                console.error(error);
            });
    }, [movieId]);

    return (
        <div>
            <Link to={backLinkRef}>Go back</Link>
            <h2>Information about movie</h2>
            {movieDetails && (
                <div>
                    <img src={`${BASE_IMG_URL}/${movieDetails.poster_path}`} alt={movieDetails.title} />
                    <h2>{movieDetails.title}</h2>
                    <p>{movieDetails.overview}</p>
                    <h5>
                        Popularity: <span>{movieDetails.popularity}</span>
                    </h5>
                    <ul>
                        {movieDetails.genres.map(genre => (
                            <li key={genre.id} className={css.itemMovieDetails}>
                                {genre.name}
                            </li>
                        ))}
                    </ul>
                    <ul>
                        <li>
                            <Link to={`/movies/${movieDetails.id}/cast`}>Cast</Link>
                        </li>
                        <li>
                            <Link to={`/movies/${movieDetails.id}/reviews`}>Reviews</Link>
                        </li>
                        <Outlet />
                    </ul>
                </div>
            )}

        </div>
    )
}

export default MovieDetails

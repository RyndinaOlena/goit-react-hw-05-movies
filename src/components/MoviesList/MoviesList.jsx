import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export const MoviesList = ({ movies, location }) => {

    console.log(location)
    return (
        <div>
            <ul>
                {movies && movies.map(movie => (
                    <li key={movie.id}>
                        <Link state={{ from: location }} to={`/movies/${movie.id}`}>
                            <h3>{movie.title || movie.name}</h3>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}


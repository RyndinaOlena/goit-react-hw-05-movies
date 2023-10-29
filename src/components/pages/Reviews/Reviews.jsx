import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const { movieId } = useParams();

    useEffect(() => {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
            params: { language: 'en-US', page: '1' },
            headers: {
                accept: 'application/json',
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTViYjNiYmJjNjI3MzhiNGE5NDcyN2Q4OGQ2N2I5ZSIsInN1YiI6IjY1MjdhNDJjODEzODMxMDExYjQ5MWJlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4SUgvkJ2_ZKVAH1mFvbYnJX5d7g63SF1OquXIcFrp9c',
            },
        };

        axios
            .request(options)
            .then(response => {
                setReviews(response.data.results);
                console.log(response.data.results);
            })
            .catch(error => {
                console.error(error);
            });
    }, [movieId]);

    return (
        <div>
            <h2>Movie Reviews</h2>
            <div >
                {reviews.map(review => (
                    <li key={review.id}>
                        <h3>{review.author}</h3>
                        <p>{review.content}</p>
                    </li>
                ))}
            </div>
        </div>
    );
};

export default Reviews;
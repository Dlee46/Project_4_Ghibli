import React from 'react';
import Movie from './Movie';

const MoviesList = (props) => {
    const movies = props.movies.map((movie) => {
        return (
            <Movie {...movie} key={movie.id} />
        )
    })
    return (
        <div>
            {movies}
        </div>
    )
}

export default MoviesList;
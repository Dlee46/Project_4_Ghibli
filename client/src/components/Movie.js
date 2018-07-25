import React from 'react';

const Movie = (props) => {
    return (
        <div>
            <div>
                {props.title}
            </div>
            <div>
                <img src={props.image} alt="" />
            </div>
            <div>
                {props.director}
            </div>
            <div>
                {props.producer}
            </div>
            <div>
                {props.release_date}
            </div>
            <div>
                {props.rating}
            </div>
            <div>
                {props.people}
            </div>
            <div>
                {props.specie}
            </div>
            <div>
                {props.location}
            </div>
            <div>
                {props.vehicle}
            </div>
        </div>
    )
}

export default Movie;
import React, { Component } from 'react';
import axios from 'axios'
import { setAxiosDefaults } from '../utils/SessionHeaderUtil'
import ReviewList from './ReviewList';

class Movie extends Component {
    state = {
        movie: {},
        reviews: []
    }
    async componentDidMount() {
        try {
            let movie = {}
            setAxiosDefaults()
            movie = await this.getMovie()
            this.setState({
                movie
            })
        } catch (error) {
            console.error(error)
        }
    }

    getMovie = async () => {
        try {
            const movieId = this.props.match.params.id
            const res = await axios.get(`/api/movies/${movieId}`)
            return res.data
        } catch (error) {
            console.error(error)
            return []
        }
    }
    handleChange = (event) => {
        const inputField = event.target.name
        const newValue = event.target.value
        const movie = { ...this.state.movie }
        movie[inputField] = newValue
        this.setState({ movie })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        let updatedMovie = this.state.movie
        const movieId = this.props.match.params.id
        axios.patch(`/api/movies/${movieId}/`, updatedMovie)
            .then((res) => {
                this.setState({
                    movies: res.data
                })
            })
    }
    render() {
        const movie = this.state.movie
        return (
            <div>
                <div>
                    <label htmlFor="image">Add Image:</label>
                    <form onSubmit={this.handleSubmit}>
                        <input type="string"
                            name="image"
                            onChange={this.handleChange} />
                        <button>Add</button>
                    </form>
                </div>
                <div>
                    <h1>{movie.title}</h1>
                    <img src={movie.image} alt={movie.title} />
                    <h3>Director: {movie.director}</h3>
                    <h3>Producer: {movie.producer}</h3>
                    <h3>Release Date: {movie.release_date}</h3>
                    <h3>Rating: {movie.rating}</h3>
                    <h3>Species: {movie.specie}</h3>
                    <h3>Location: {movie.location}</h3>
                    <h3>Vehicles: {movie.vehicle}</h3>

                    <h3>Characters:</h3>
                    <li><h5>{movie.people}</h5></li>

                </div>
                <div>
                    <ReviewList {...this.props} reviews={this.state.reviews} />
                </div>
            </div>
        );
    }
}

export default Movie;
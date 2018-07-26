import React, { Component } from 'react';
import axios from 'axios'
import { setAxiosDefaults } from '../utils/SessionHeaderUtil'
import ReviewList from './ReviewList';

class Movie extends Component {
    state = {
        movies: [],
        reviews: []
    }
    async componentDidMount() {
        try {
            let reviews = []
            let movies = []
            setAxiosDefaults()
            movies = await this.getMovies()
            this.setState({
                movies,
                reviews
            })
        } catch (error) {
            console.error(error)
        }
    }
    getReviews = async () => {
        try {
            const movieId = this.props.match.params.id
            const res = await axios.get(`/api/movies/${movieId}/reviews`)
            return res.data
        } catch (error) {
            console.error(error)
            return []
        }
    }
    getMovies = async () => {
        try {
            // const movieId = this.props.match.params.id
            const res = await axios.get(`/api/movies/`)
            return res.data
        } catch (error) {
            console.error(error)
            return []
        }
    }
    handleChange = (event) => {
        const inputField = event.target.name
        const newValue = event.target.value
        const movies = [...this.state.movies]
        movies[this.props.index][inputField] = newValue
        this.setState({ movies })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        let newImage = this.state.movies
        const movieId = this.props.match.params.id
        axios.patch(`/api/cities/${movieId}/`, newImage)
            .then((res) => {
                this.this.setState({
                    movies: res.data
                })
            })
    }
    render() {
        const movies = this.state.movies
        const movie = movies.map((movie) => {
            return (
                <div key={movie.id}>
                    <h1>{movie.title}</h1>
                    <img src={movie.image} alt={movie.title} />
                    <h3>{movie.director}</h3>
                    <h3>{movie.producer}</h3>
                    <h3>{movie.release_date}</h3>
                    <h3>{movie.rating}</h3>
                    <h3>{movie.specie}</h3>
                    <h3>{movie.location}</h3>
                    <h3>{movie.vehicle}</h3>
                    <ul>
                        <li><h5>{movie.people}</h5></li>
                    </ul>
                </div>
            )
        })
        return (
            <div>
                {this.props.signedIn ? <button onClick={this.signOut}>Sign Out</button>
                    : null}
                <div>
                    <label htmlFor="image">Add Image:</label>
                    <form onSubmit={this.handleSubmit}>
                        <input type="string"
                            name="image"
                            onChange={this.handleChange} />
                        <button>Add</button>
                    </form>
                </div>
                {movie}
                <div>
                    <ReviewList {...this.props} reviews={this.state.reviews} />
                </div>
            </div>
        );
    }
}

export default Movie;
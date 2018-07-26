import React, { Component } from 'react';
import axios from 'axios'
import { setAxiosDefaults } from '../utils/SessionHeaderUtil'
import { Link } from 'react-router-dom'

class MoviesList extends Component {
    state = {
        movies: []
    }
    async componentDidMount() {
        try {
            let movies = []
            setAxiosDefaults()
            movies = await this.getMovies()
            this.setState({
                movies
            })
        } catch (error) {
            console.error(error)
        }
    }
    getMovies = async () => {
        try {
            const res = await axios.get('/api/movies/')
            console.log(res.data)
            return res.data
        } catch (error) {
            console.error(error)
            return []
        }
    }
    render() {
        const movies = this.state.movies
        const movie = movies.map((movie) => {
            const movieId = `/movies/${movie.id}/reviews`
            return (
                <div key={movie.id}>
                    <Link to={movieId} alt={movie.title} ><h1>{movie.title}</h1></Link>
                    <img src={movie.image} alt={movie.title} />
                    <h3>{movie.director}</h3>
                    <h3>{movie.producer}</h3>
                </div >
            )
        })
        return (
            <div>
                {this.props.signedIn ? <button onClick={this.signOut}>Sign Out</button>
                    : null}
                {movie}
            </div >
        );
    }
}

export default MoviesList;
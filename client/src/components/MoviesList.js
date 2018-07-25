import React, { Component } from 'react';
import axios from 'axios'
class MoviesList extends Component {
    state = {
        movies: []
    }
    async componentDidMount() {
        try {
            let movies = []
            // if (this.props.signedIn) {
            movies = await this.getMovies()
            // }
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
            console.log("FETCH", res)
            return res.data
        } catch (error) {
            console.error(error)
            return []
        }
    }
    render() {
        
        return (
            <div>
                Hello World
            </div>
        );
    }
}

export default MoviesList;
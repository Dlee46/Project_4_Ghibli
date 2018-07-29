import React, { Component } from 'react';
import axios from 'axios'
import { setAxiosDefaults } from '../utils/SessionHeaderUtil'
import { Link } from 'react-router-dom'
import { Button, Card, Image, Container, Segment } from 'semantic-ui-react'
import styled from 'styled-components'

const Background = styled.div`
background-image: url('http://33.media.tumblr.com/891008a1c62d811c86b8406e1ce04e80/tumblr_nj5r0xB8N51rm75fro1_500.gif');
background-repeat: no-repeat;
background-size:270vh;
height: 100vh;
width: 100%;
opacity: 0.8;
overflow: scroll;
`
class MoviesList extends Component {
    state = {
        movies: [],
        ghibliMovies: []
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
    ghibliHandleChange = (event) => {
        const input = event.target.name
        const value = event.target.value
        const movie = [...this.state.ghibliMovies]
        movie[input] = value
        this.setState({ ghibliMovies: movie })
    }
    getMovies = async () => {
        try {
            const res = await axios.get('/api/movies/')
            return res.data
        } catch (error) {
            console.error(error)
            return []
        }
    }
    deleteMovie = (movieId) => {
        setAxiosDefaults()
        axios.delete(`/api/movies/${movieId}`).then((res) => {
            this.setState({ movies: res.data })
        })
    }
    getGhibliMovie = () => {
        axios.get(`https://ghibliapi.herokuapp.com/films/`)
            .then((res) => {
                // const ghibli = [
                //     title: res.data.title,
                //     description: res.data.description,
                //     director: res.data.director,
                //     producer: res.data.producer,
                //     release_date: res.data.release_date,
                //     rating: res.data.rt_score,
                //     people: res.data.people,
                //     specie: res.data.species,
                //     location: res.data.locations,
                //     vehicle: res.data.vehicles
                // ]
                res.data.filter((movie) => {
                    console.log(movie.title == "Castle in the Sky")
                }).then((res) => {
                    this.setState({ ghibliMovies: res.data })
                })
            })

    }
    addMovie = (event) => {
        const newMovie = { ...this.state.ghibliMovies }
        axios.post(`/api/movies/`, newMovie).then((res) => {
            this.setState({
                movies: res.data
            })
        })
    }
    render() {
        const ghibli = this.state.ghibliMovies || []
        const movies = this.state.movies
        const movie = movies.map((movie) => {
            const movieId = `/movies/${movie.id}/reviews`
            return (
                <Card key={movie.id}>
                    <Card.Content>
                        <Link to={movieId} alt={movie.title} ><Card.Header>
                            <h1>
                                {movie.title}
                            </h1>
                        </Card.Header></Link>
                        <Image src={movie.image} alt={movie.title} href={movieId} />
                        <Card.Meta>
                            <h3>{movie.director}</h3>
                            <h3>{movie.producer}</h3>
                        </Card.Meta>
                        <Button basic color='red' onClick={() => this.deleteMovie(movie.id)}>Remove</Button>
                    </Card.Content>
                </Card >
            )
        })
        return (
            <Background>
                <Container>
                    <Segment>
                        <input type="text"
                            name="title"
                            placeholder="Title"
                            onChange={this.ghibliHandleChange} />
                        <Button onClick={this.getGhibliMovie}>Search</Button>
                    </Segment>
                    <Card onClick={this.addMovie}>
                        <h1>Title: {ghibli.title}</h1>
                        <h3>Did it Work? {ghibli.director}</h3>
                    </Card>
                    <Card.Group>
                        {movie}
                    </Card.Group>
                </Container>
            </Background>
        );
    }
}

export default MoviesList;
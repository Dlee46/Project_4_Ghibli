import React, { Component } from 'react';
import axios from 'axios'
import { setAxiosDefaults } from '../utils/SessionHeaderUtil'
import { Link } from 'react-router-dom'
import { Button, Card, Image, Container, Segment } from 'semantic-ui-react'
import styled from 'styled-components'

const Background = styled.div`
    @media (max-width: 400px) {
background-image: url('http://33.media.tumblr.com/891008a1c62d811c86b8406e1ce04e80/tumblr_nj5r0xB8N51rm75fro1_500.gif');
background-repeat: no-repeat;
background-size:270vh;
height: 100vh;
width: 100%;
opacity: 0.8;
overflow: scroll;
    }

`
const StyledCard = styled(Card)`
&&&{
    @media (max-width: 400px) {
    width: 100%;
    opacity: 0.9;
    margin-bottom: 5vh;
    }
}
`
const StyledImage = styled(Image)`
&&&{
@media (max-width: 400px) {
    display: none;
}
}
`
class MoviesList extends Component {
    state = {
        movies: [],
        ghibli: {}
    }
    async componentDidMount() {
        setAxiosDefaults()

        try {
            await this.getMovies()
        } catch (error) {
            console.error(error)
        }
    }
    getMovies = async () => {
        try {
            const res = await axios.get('/api/movies/')
            await this.setState({ movies: res.data })
        } catch (error) {
            console.error(error)
            return []
        }
    }
    deleteMovie = (movieId) => {
        setAxiosDefaults()
        axios.delete(`/api/movies/${movieId}`)
            .then(() => {
                this.getMovies()
            })
    }
    ghibliHandleChange = (event) => {
        const input = event.target.name
        const value = event.target.value
        const movie = { ...this.state.ghibli }
        movie[input] = value
        this.setState({ ghibli: movie })
    }
    getGhibliMovie = () => {
        let movies = []
        axios.get(`https://ghibliapi.herokuapp.com/films/`)
            .then((res) => {
                movies = (res.data)
            }).then(() => {
                const movieFound = movies.find((movie) => {
                    return movie.title.toLowerCase() === (this.state.ghibli.title)
                })

                this.setState({ ghibli: movieFound })

            })
    }
    addMovie = (event) => {
        const ghibli = this.state.ghibli
        const newMovie = {
            title: ghibli.title,
            description: ghibli.description,
            director: ghibli.director,
            producer: ghibli.producer,
            release_date: ghibli.release_date,
            rating: ghibli.rt_score,
            people: ghibli.people,
            specie: ghibli.species,
            location: ghibli.locations,
            vehicle: ghibli.vehicles
        }
        axios.post(`/api/movies/`, newMovie).then((res) => {
            this.setState({
                title: res.data.title,
                description: res.data.description,
                director: res.data.director,
                producer: res.data.producer,
                release_date: res.data.release_date,
                rating: res.data.rt_score,
                people: res.data.people,
                specie: res.data.species,
                location: res.data.locations,
                vehicle: res.data.vehicles
            })
            this.getMovies()
        })
    }
    render() {
        const ghibli = this.state.ghibli || {}
        const movies = this.state.movies || []
        const movie = movies.map((movie) => {
            const movieReviewLink = `/movies/${movie.id}/reviews`
            return (
                <StyledCard key={movie.id}>
                    <StyledCard.Content>
                        <Link to={movieReviewLink} alt={movie.title} >
                            <StyledCard.Header>
                                <h1>
                                    {movie.title}
                                </h1>
                            </StyledCard.Header>
                        </Link>
                        <Image src={movie.image} alt={movie.title} href={movieReviewLink} />
                        <h3>Director: {movie.director}</h3>
                        <h3>Producer: {movie.producer}</h3>
                        <Button basic color='red' onClick={() => this.deleteMovie(movie.id)}>Remove</Button>
                    </StyledCard.Content>
                </StyledCard >
            )
        })
        return (
            <Background>
                <StyledImage src="https://choualbox.com/Img/139049849462.jpg" alt="" />
                <Container>
                    <Segment>
                        <input type="text"
                            name="title"
                            placeholder="Title"
                            onChange={this.ghibliHandleChange} />
                        <Button onClick={this.getGhibliMovie}>Search</Button>
                    </Segment>
                    <StyledCard onClick={this.addMovie}>
                        <h1>Title: {ghibli.title}</h1>
                        <h3>Director: {ghibli.director}</h3>
                        <h3>Producer: {ghibli.producer}</h3>
                    </StyledCard>
                    <StyledCard.Group>
                        {movie}
                    </StyledCard.Group>
                    {this.props.signedIn ? <Button onClick={this.props.signOut}>Sign Out</Button>
                        : null}
                </Container>
            </Background>
        );
    }
}

export default MoviesList;
import React, { Component } from 'react';
import axios from 'axios'
import { setAxiosDefaults } from '../utils/SessionHeaderUtil'
import ReviewList from './ReviewList';
import { List, Button, Form, Container } from '../../../node_modules/semantic-ui-react';

class Movie extends Component {
    state = {
        movie: {},
        reviews: []
    }
    goBack = () => {
        this.props.history.goBack()
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
                console.log("HI", res.data)
                // this.setState({
                //     movies: res.data
                // })
            })
    }
    render() {
        const movie = this.state.movie
        return (
            <Container>
                <Button onClick={() => this.goBack()}> Back </Button>
                <div>
                    <Form onSubmit={this.handleSubmit}>
                        <label htmlFor="image">Add Image:</label>
                        <input type="string"
                            name="image"
                            onChange={this.handleChange} />
                        <Button>Add</Button>
                    </Form>
                </div>
                <List>
                    <List.Item>
                        <List.Content>
                            <h1>{movie.title}</h1>
                        </List.Content>
                    </List.Item>
                    <img src={movie.image} alt={movie.title} />
                    <List.Item>
                        <List.Content>
                            Director: {movie.director}
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>

                            Producer: {movie.producer}
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>
                            Release Date: {movie.release_date}
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>

                            Rating: {movie.rating}
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>
                            Location: {movie.location}
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>

                            Vehicles: {movie.vehicle}
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>
                            Species: {movie.specie}
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>

                            Characters: <h5>{movie.people}</h5>
                        </List.Content>
                    </List.Item>
                </List>
                <div>
                    <ReviewList {...this.props} reviews={this.state.reviews} />
                </div>
            </Container>
        );
    }
}

export default Movie;
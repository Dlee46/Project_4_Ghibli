import React, { Component } from 'react';
import axios from 'axios'
import { setAxiosDefaults } from '../utils/SessionHeaderUtil'
import ReviewList from './ReviewList';
import { List, Button, Form, Container, Label, Segment } from '../../../node_modules/semantic-ui-react';
import styled from 'styled-components'

const Background = styled.div`
background-color: #f0f3f3;
@media (max-width: 400px) {
background-image: url('http://33.media.tumblr.com/8fc5ea349115e4c071f4a694aa1eedf9/tumblr_nj5r0xB8N51rm75fro2_500.gif');
background-repeat: no-repeat;
background-size:270vh;
background-position: center;
height: 100vh;
width: 100%;
opacity: 0.8;
overflow: scroll;
}
`
const Banner = styled.div`
background-color: white;
display:flex;
display: column;
justify-content: space-evenly;
border: 0;
margin: 2% 0;
width: 100%;
img{
    width: 20vw;
    height:20vh;
}
@media (max-width: 400px) {
display: none;
}
`
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
                this.setState({
                    movies: res.data
                })
            })
    }
    render() {
        const movie = this.state.movie
        return (
            <Background>
                <Banner>
                    <img src="https://ih0.redbubble.net/image.210455430.8452/flat,800x800,075,f.u1.jpg" alt="" />
                    <img src="https://ih0.redbubble.net/image.210454517.8427/flat,800x800,075,f.u1.jpg" alt="" />
                    <img src="https://ih1.redbubble.net/image.210456388.8481/flat,800x800,075,f.u1.jpg" alt="" />
                </Banner>
                <Container>
                    <div>
                        <Form onSubmit={this.handleSubmit}>
                            <Label htmlFor="image">Add Image:</Label>
                            <input type="string"
                                name="image"
                                onChange={this.handleChange} />
                            <Button>Add</Button>
                        </Form>
                    </div>
                    <Segment>
                        <List.Item>
                            <List.Content>
                                <h1>{movie.title}</h1>
                            </List.Content>
                        </List.Item>
                        <img src={movie.image} alt={movie.title} />
                        <List.Item>
                            <List.Content>
                                <h3>Director: </h3>
                                {movie.director}
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>
                                <h3> Producer: </h3>{movie.producer}
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>
                                <h3>Release Date: </h3>{movie.release_date}
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>

                                <h3>Rating: </h3>{movie.rating}
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>
                                <h3> Location: </h3>{movie.location}
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>

                                <h3>Vehicles: </h3>{movie.vehicle}
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>
                                <h3>Species: </h3>{movie.specie}
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>

                                <h3>Characters: </h3><h5>{movie.people}</h5>
                            </List.Content>
                        </List.Item>
                    </Segment>
                    <div>
                        <ReviewList {...this.props} reviews={this.state.reviews} />
                    </div>
                    <Button onClick={() => this.goBack()}> Back </Button>
                    {this.props.signedIn ? <Button onClick={this.props.signOut}>Sign Out</Button>
                        : null}
                </Container>
            </Background>
        );
    }
}

export default Movie;
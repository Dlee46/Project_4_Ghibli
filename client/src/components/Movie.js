import React, { Component } from 'react';
import axios from 'axios'
import { setAxiosDefaults } from '../utils/SessionHeaderUtil'
import ReviewList from './ReviewList';
import { List, Button, Form, Container, Label, Segment, Menu, Input, Icon } from '../../../node_modules/semantic-ui-react';
import styled from 'styled-components'

const Background = styled.div`
background-color: #f0f3f3;
img{
    height: 500px;
}
@media (max-width: 400px) {
background-image: url('http://33.media.tumblr.com/8fc5ea349115e4c071f4a694aa1eedf9/tumblr_nj5r0xB8N51rm75fro2_500.gif');
background-repeat: no-repeat;
background-size:270vh;
background-position: center;
height: 100vh;
width: 100%;
opacity: 0.8;
overflow: scroll;
margin-top: 11%;
}
`
const Banner = styled.div`
background-color: white;
display:flex;
display: column;
justify-content: space-evenly;
border: 0;
margin:6% 0 0 0;
width: 100%;
img{
    width: 20vw;
    height:20vh;
}
@media (max-width: 400px) {
display: none;
}
`
const NavBottom = styled.div`
@media (min-width: 400px) {
display: none;
}
`
const MenuStyle = styled(Menu)`
    &&&{
    z-index: 10000;
    position: fixed;
    top: 0px;
    width:100%;
    background-color: #f0f3f3;
    margin: 0;
    height: 2%;
}
`
class Movie extends Component {
    state = {
        movie: {},
        reviews: []
    }
    returnHome = () => {
        this.props.history.push(`/`)
    }
    login = () => {
        this.props.history.push(`/login`)
    }
    signup = () => {
        this.props.history.push(`/signup`)
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
                <MenuStyle secondary>
                    <Menu.Item
                        name='Home'
                        onClick={this.returnHome} />
                    <Menu.Item
                        name='Back'
                        onClick={() => this.goBack()}
                    />
                    {!this.props.signedIn ?
                        <Menu.Item
                            name='Sign Up'
                            onClick={() => this.signup()}
                        />
                        : null}
                    {!this.props.signedIn ?
                        <Menu.Item
                            name='Log In'
                            onClick={() => this.login()}
                        />
                        : null}
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Form onSubmit={this.handleSubmit}>
                                <Input type="string"
                                    name="image"
                                    onChange={this.handleChange} />
                                <Button>Add</Button>
                            </Form>
                        </Menu.Item>
                        {this.props.signedIn ? <Menu.Item
                            name='logout'
                            onClick={this.props.signOut}
                        />
                            : null}
                    </Menu.Menu>
                </MenuStyle>
                <Banner>
                    <img src="https://ih0.redbubble.net/image.210455430.8452/flat,800x800,075,f.u1.jpg" alt="" />
                    <img src="https://ih0.redbubble.net/image.210454517.8427/flat,800x800,075,f.u1.jpg" alt="" />
                    <img src="https://ih1.redbubble.net/image.210456388.8481/flat,800x800,075,f.u1.jpg" alt="" />
                </Banner>

                <Container>
                    <div>
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

                                <h3>Synopsis: </h3>{movie.description}
                            </List.Content>
                        </List.Item>
                    </Segment>
                    <div>
                        <ReviewList {...this.props} reviews={this.state.reviews} />
                    </div>
                    <NavBottom>
                        <Button onClick={() => this.goBack()}> Back </Button>
                        {this.props.signedIn ? <Button onClick={this.props.signOut}>Sign Out</Button>
                            : null}
                    </NavBottom>
                </Container>
            </Background>
        );
    }
}

export default Movie;
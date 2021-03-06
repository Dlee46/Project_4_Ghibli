import React, { Component } from 'react';
import axios from 'axios'
import { setAxiosDefaults } from '../utils/SessionHeaderUtil'
import { Link } from 'react-router-dom'
import { Segment, Button, Icon, Container, Comment, Form, Header, Label } from 'semantic-ui-react'


class ReviewList extends Component {
    state = {
        reviews: [],
        newTitle: '',
        newComment: ''
    }
    handleChange = (event) => {
        const newState = { ...this.state }
        newState[event.target.name] = event.target.value
        console.log('newState', newState)
        this.setState(newState)
    }
    handleSubmit = (event) => {
        event.preventDefault()
        let newReview = {
            title: this.state.newTitle,
            comment: this.state.newComment
        }
        const movieId = this.props.match.params.id
        console.log(newReview)
        axios.post(`/api/movies/${movieId}/reviews`, newReview)
            .then((res) => {
                const reviews = [...this.state.reviews]
                reviews.push(res.data)
                this.setState({ reviews })
            })
    }
    async componentDidMount() {
        try {
            setAxiosDefaults()
            await this.getReviews()
        } catch (error) {
            console.error(error)
        }
    }
    getReviews = async () => {
        try {
            const movieId = this.props.match.params.id
            const res = await axios.get(`/api/movies/${movieId}/reviews`)
            this.setState({
                reviews: res.data
            })
        } catch (error) {
            console.error(error)
            return []
        }
    }
    deleteComment = (reviewId) => {
        const movieId = this.props.match.params.id
        axios.delete(`/api/movies/${movieId}/reviews/${reviewId}`)
            .then(() => {
                this.getReviews()
            })
    }
    render() {
        console.log(this.props)
        const reviews = this.state.reviews
        const movieId = this.props.match.params.id
        const review = reviews.map((review) => {
            console.log(review)
            return (
                <Comment key={review.id}>
                    <Comment.Content>
                        <Link to={`/movies/${movieId}/reviews/${review.id}`}><h3>{review.title} <Icon name="edit" size="small"></Icon></h3></Link>
                        <Comment.Text>
                            <h4>{review.comment}</h4>
                        </Comment.Text>
                        <Comment.Action onClick={() => this.deleteComment(review.id)}>Delete</Comment.Action>
                    </Comment.Content>
                </Comment>
            )
        })
        return (
            <Container>
                <Segment>
                    <Comment.Group>
                        <Header>Reviews</Header>
                        {review}
                    </Comment.Group>
                </Segment>
                <Segment.Group>
                    <Segment>
                        <Form onSubmit={this.handleSubmit}>
                            <Label>Title</Label>
                            <input type="string" name="newTitle" onChange={this.handleChange} />
                            <Form.Field>
                                <Label >Review</Label>
                                <Form.TextArea name="newComment" onChange={this.handleChange} cols="50" rows="10"></Form.TextArea>
                            </Form.Field>
                            <Button basic color='blue'>Submit</Button>
                        </Form>
                    </Segment>
                </Segment.Group>

            </Container>
        );
    }
}

export default ReviewList;
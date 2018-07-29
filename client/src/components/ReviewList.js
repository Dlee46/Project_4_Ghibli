import React, { Component } from 'react';
import axios from 'axios'
import { setAxiosDefaults } from '../utils/SessionHeaderUtil'
import { Link } from 'react-router-dom'
import { Segment, Button, Icon, Container, Comment, Form } from 'semantic-ui-react'


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
            let reviews = []
            setAxiosDefaults()
            reviews = await this.getReviews()
            this.setState({
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
    deleteComment = (reviewId) => {
        const movieId = this.props.match.params.id
        axios.delete(`/api/movies/${movieId}/reviews/${reviewId}`)
            .then((res) => {
                this.setState({
                    reviews: res.data
                })
            })
    }
    render() {
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
                <div>
                    <h2>Reviews</h2>
                    {review}
                </div>
                <Segment.Group>
                    <Segment>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <label>Title</label>
                                <input type="string" name="newTitle" onChange={this.handleChange} />
                            </Form.Field>
                            <Form.Field>
                                <label >Review</label>
                                <textarea name="newComment" onChange={this.handleChange} cols="50" rows="10"></textarea>
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
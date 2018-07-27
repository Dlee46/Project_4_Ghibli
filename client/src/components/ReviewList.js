import React, { Component } from 'react';
import axios from 'axios'
import { setAxiosDefaults } from '../utils/SessionHeaderUtil'
import { Link } from 'react-router-dom'

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
                this.setState({ reviews: res.data })
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
            return (
                <div key={review.id}>
                    <Link to={`/movies/${movieId}/reviews/${review.id}`}><h4>{review.title}</h4></Link>
                    <h4>{review.comment}</h4>
                    <button onClick={() => this.deleteComment(review.id)}>X</button>
                </div>
            )
        })
        return (
            <div>
                <div>
                    <h2>Reviews</h2>
                    {review}
                </div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="title">Title:</label>
                        <input type="string" name="newTitle" onChange={this.handleChange} />
                        <br />
                        <textarea name="newComment" onChange={this.handleChange} cols="100" rows="10"></textarea>
                        <br />
                        <button>Review</button>
                    </form>
                </div>

            </div>
        );
    }
}

export default ReviewList;
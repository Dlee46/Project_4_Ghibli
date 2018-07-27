import React, { Component } from 'react';
import { setAxiosDefaults } from '../utils/SessionHeaderUtil'
import axios from 'axios'

class Review extends Component {
    state = {
        review: {},
        showEdit: false
    }
    async componentDidMount() {
        try {
            let review = {}
            setAxiosDefaults()
            review = await this.getReview()
            this.setState({
                review
            })
        } catch (error) {
            console.error(error)
        }
    }
    getReview = async () => {
        try {
            const movieId = this.props.match.params.movieId
            const reviewId = this.props.match.params.id
            const res = await axios.get(`/api/movies/${movieId}/reviews/${reviewId}`)
            return res.data
        } catch (error) {
            console.error(error)
            return []
        }
    }
    handleEditChange = (event) => {
        const input = event.target.name
        const value = event.target.value
        const newReview = { ...this.state.review }
        newReview[input] = value
        this.setState({ review: newReview })
    }
    handleEditSubmit = (event) => {
        event.preventDefault()
        let updatedReview = this.state.review
        const movieId = this.props.match.params.movieId
        const reviewId = this.props.match.params.id
        axios.patch(`/api/movies/${movieId}/reviews/${reviewId}`, updatedReview)
            .then((res) => {
                this.setState({
                    review: res.data
                })
            })
    }
    render() {
        const review = this.state.review
        return (
            <div>
                {review.title}
                {review.comment}
                <div>

                    <form onSubmit={this.handleEditSubmit}>
                        <label htmlFor="title">Title:</label>
                        <input type="string" name="title" defaultValue={review.title} onChange={this.handleEditChange} />
                        <br />
                        <textarea name="comment" placheholder={review.comment} onChange={this.handleEditChange} cols="100" rows="10"></textarea>
                        <br />
                        <button>Update</button>
                    </form>

                </div>
            </div>
        );
    }
}

export default Review;
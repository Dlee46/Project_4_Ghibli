import React, { Component } from 'react';
import { setAxiosDefaults } from '../utils/SessionHeaderUtil'
import axios from 'axios'

class Review extends Component {
    state = {
        review: {}
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
    render() {
        const review = this.state.review
        return (
            <div>
                {review.title}
                {review.comment}
            </div>
        );
    }
}

export default Review;
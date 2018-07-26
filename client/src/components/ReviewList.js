import React, { Component } from 'react';
import axios from 'axios'
import { setAxiosDefaults } from '../utils/SessionHeaderUtil'

class ReviewList extends Component {
    state = {
        movies: [],
        reviews: []
    }
    async componentDidMount() {
        try {
            let reviews = []
            setAxiosDefaults()
            reviews = await this.getMovieAndReviews()
            this.setState({
                reviews
            })
        } catch (error) {
            console.error(error)
        }
    }
    getMovieAndReviews = async () => {
        try {
            const movieId = this.props.match.params.id
            const res = await axios.get(`/api/movies/${movieId}/reviews`)
            console.log(res.data)
            return res.data
        } catch (error) {
            console.error(error)
            return []
        }
    }
    render() {
        console.log("Review", this.state)
        const reviews = this.state.reviews
        console.log("Review", reviews)
        const review = reviews.map((review) => {
            return (
                <div key={review.id}>
                    {review.title}
                    {review.review}
                </div>
            )
        })
        return (
            <div>
                <h2>Reviews</h2>
                {review}
            </div>
        );
    }
}

export default ReviewList;
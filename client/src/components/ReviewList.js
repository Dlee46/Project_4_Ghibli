import React, { Component } from 'react';
import axios from 'axios'
import { setAxiosDefaults } from '../utils/SessionHeaderUtil'
import { Link } from 'react-router-dom'

class ReviewList extends Component {
    state = {
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
            return res.data
        } catch (error) {
            console.error(error)
            return []
        }
    }
    render() {
        const reviews = this.state.reviews
        const movieId = this.props.match.params.id
        const review = reviews.map((review) => {
            return (
                <div key={review.id}>
                    <Link to={`/movies/${movieId}/reviews/${review.id}`}><h4>{review.title}</h4></Link>
                    <h4>{review.review}</h4>
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
                    <form onSubmit={}>
                        <label htmlFor="title">Title:</label>
                        <input type="string" name="title" onChange={} />
                        <textarea name="review" onChange={} cols="30" rows="10"></textarea>
                        <button>Review</button>
                    </form>
                </div>

            </div>
        );
    }
}

export default ReviewList;
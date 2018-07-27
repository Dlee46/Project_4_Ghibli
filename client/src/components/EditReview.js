import React, { Component } from 'react';
import axios from 'axios'
import { setAxiosDefaults } from '../utils/SessionHeaderUtil'

class EditReview extends Component {
    state = {
        review: {}
    }
    handleChange = (event) => {
        const newState = { ...this.state }
        newState[event.target.name] = event.target.value
        this.setState(newState)
    }
    handleSubmit = (event) => {
        event.preventDefault()
        let newReview = this.state.reviews
        const movieId = this.props.match.params.id
        setAxiosDefaults()
        axios.post(`/api/movies/${movieId}/reviews`, newReview)
            .then((res) => {
                this.setState({ reviews: res.data, showEdit: false })
            })
    }
    render() {
        return (
            <div>

                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="title">Title:</label>
                    <input type="string" name={this.props.review.title} placeholder={this.props.review.title} onChange={this.handleChange} />
                    <br />
                    <textarea name={this.props.review.comment} onChange={this.handleChange} cols="100" rows="10"></textarea>
                    <br />
                    <button>Update</button>
                </form>

            </div>
        );
    }
}

export default EditReview;
import React, { Component } from 'react';
import { setAxiosDefaults } from '../utils/SessionHeaderUtil'
import axios from 'axios'
import { Form, Button, Container, Label, Segment } from '../../../node_modules/semantic-ui-react';
import styled from 'styled-components'

const Background = styled.div`
background-image: url('https://img00.deviantart.net/6c07/i/2011/191/2/c/totoro_by_iriname-d3lmfir.jpg');
background-repeat: no-repeat;
background-size: 100%;
background-position: center;
height: 100vh;
width:100%;
@media (max-width: 500px) {
background-image: url('http://33.media.tumblr.com/8fc60d2a4d5be9e7a397d8190b8ea231/tumblr_nj5r0xB8N51rm75fro3_500.gif');
background-size:270vh;
overflow: scroll;
}
`
const StyledForm = styled(Segment)`
&&&{
    opacity: 0.7;
}
`
const StyledContainer = styled(Container)`
&&&{
    height: 100%;
display: flex;
align-items: center;
justify-content:center;
}
`
class Review extends Component {
    state = {
        review: {},
        showEdit: false
    }
    handleToggle = () => {
        const editPost = !this.state.showEdit
        this.setState({
            showEdit: editPost
        })
    }
    goBack = () => {
        this.props.history.goBack()
    }
    returnHome = () => {
        this.props.history.push(`/`)
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
                this.props.history.push(`/movies/${movieId}/reviews`)
            })
    }
    render() {
        const review = this.state.review || {}
        return (
            <Background>
                <StyledContainer>
                    {this.state.showEdit ?
                        <div>
                            {review.title}
                            {review.comment}
                        </div>
                        :
                        <StyledForm>
                            <h1>Edit Review</h1>
                            <Form onSubmit={this.handleEditSubmit}>
                                <Label htmlFor="title">Title:</Label>
                                <input type="string" name="title" defaultValue={review.title} onChange={this.handleEditChange} />
                                <br />
                                <Form.TextArea name="comment" placheholder={review.comment} onChange={this.handleEditChange} cols="100" rows="10"></Form.TextArea>
                                <Button>Update</Button>
                            </Form>
                            <Button onClick={() => this.returnHome()}> Home </Button>
                            <Button onClick={() => this.goBack()}> Back </Button>
                            {this.props.signedIn ? <Button onClick={this.props.signOut}>Sign Out</Button>
                                : null}
                        </StyledForm>
                    }
                </StyledContainer>
            </Background>
        );
    }
}

export default Review;
import React, { Component } from 'react';
import { Container, Form, Label, Button } from '../../../node_modules/semantic-ui-react';
import styled from 'styled-components'

const Background = styled.div`
background-color: #0d3f6c;
height: 100vh;
`
class SignUp extends Component {
    state = {
        email: '',
        password: '',
        password_confirmation: ''
    }

    signUp = (event) => {
        event.preventDefault()
        this.props.signUp(
            this.state.email,
            this.state.password,
            this.state.password_confirmation
        ).then(() => {
            return (
                this.props.history.push(`/`)
            )
        })
    }


    handleChange = (event) => {
        const newState = { ...this.state }
        newState[event.target.name] = event.target.value
        this.setState(newState)
    }

    render() {
        return (
            <Background>
                <Container>
                    <img src="http://25.media.tumblr.com/tumblr_m8rwabWSdB1r621gdo1_r1_500.gif" alt="" />
                    <Form>
                        <div>
                            <Label htmlFor="email">E-mail: </Label>
                            <input onChange={this.handleChange} type="text" name="email" value={this.state.email} />
                        </div>
                        <div>
                            <Label htmlFor="password">Password: </Label>
                            <input onChange={this.handleChange} type="password" name="password" value={this.state.password} />
                        </div>
                        <div>
                            <Label htmlFor="password_confirmation">Confirm Password: </Label>
                            <input onChange={this.handleChange} type="password" name="password_confirmation"
                                value={this.state.password_confirmation} />
                        </div>

                        <Button onClick={this.signUp}>Sign Up</Button>
                    </Form>
                </Container>
            </Background>
        )
    }
}

export default SignUp;
import React, { Component } from 'react';
import { Container, Form, Button, Label } from '../../../node_modules/semantic-ui-react';
import styled from 'styled-components'

const Background = styled.div`
background-color: #0d3f6c;
height: 100vh;
`
class LogIn extends Component {
    state = {
        email: '',
        password: ''
    }

    signIn = (event) => {
        event.preventDefault()
        this.props.signIn(
            this.state.email,
            this.state.password
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
                        <Button onClick={this.signIn}>Log In</Button>
                    </Form>
                </Container>
            </Background>
        )
    }
}

export default LogIn;
import React, { Component } from 'react';
import { Container, Form, Button, Label } from '../../../node_modules/semantic-ui-react';

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
            <Container>
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
        )
    }
}

export default LogIn;
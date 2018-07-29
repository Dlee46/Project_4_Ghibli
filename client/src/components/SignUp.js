import React, { Component } from 'react';
import { Container, Form, Label, Button } from '../../../node_modules/semantic-ui-react';

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
                    <div>
                        <Label htmlFor="password_confirmation">Confirm Password: </Label>
                        <input onChange={this.handleChange} type="password" name="password_confirmation"
                            value={this.state.password_confirmation} />
                    </div>

                    <Button onClick={this.signUp}>Sign Up</Button>
                </Form>
            </C>
        )
    }
}

export default SignUp;
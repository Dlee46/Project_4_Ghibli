import React, { Component } from 'react';

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
            <div>
                <form>
                    <div>
                        <label htmlFor="email">E-mail: </label>
                        <input onChange={this.handleChange} type="text" name="email" value={this.state.email} />
                    </div>
                    <div>
                        <label htmlFor="password">Password: </label>
                        <input onChange={this.handleChange} type="password" name="password" value={this.state.password} />
                    </div>
                    <button onClick={this.signIn}>Log In</button>
                </form>
            </div>
        )
    }
}

export default LogIn;
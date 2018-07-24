import React, { Component } from 'react';

class SignUp extends Component {
    state = {
        name: '',
        nickname: '',
        image: '',
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
        )
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
                        <label htmlFor="name">Name: </label>
                        <input onChange={this.handleChange} type="text" name="name" value={this.state.name} />
                    </div>
                    <div>
                        <label htmlFor="nickname">Nickname: </label>
                        <input onChange={this.handleChange} type="text" name="nickname" value={this.state.nickname} />
                    </div>
                    <div>
                        <label htmlFor="image">Image: </label>
                        <input onChange={this.handleChange} type="text" name="image" value={this.state.image} />
                    </div>
                    <div>
                        <label htmlFor="email">E-mail: </label>
                        <input onChange={this.handleChange} type="text" name="email" value={this.state.email} />
                    </div>
                    <div>
                        <label htmlFor="password">Password: </label>
                        <input onChange={this.handleChange} type="password" name="password" value={this.state.password} />
                    </div>
                    <div>
                        <label htmlFor="password_confirmation">Confirm Password: </label>
                        <input onChange={this.handleChange} type="password" name="password_confirmation"
                            value={this.state.password_confirmation} />
                    </div>

                    <button onClick={this.signUp}>Sign Up</button>
                </form>
            </div>
        )
    }
}

export default SignUp;
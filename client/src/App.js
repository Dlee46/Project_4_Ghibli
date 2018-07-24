import React, { Component } from 'react'
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import SignUp from './components/SignUp'
import LogIn from './components/LogIn'
import axios from 'axios'

class App extends Component {

  signUp = async (name, nickname, image, email, password, password_confirmation) => {
    try {
      const payload = {
        name: name,
        nickname: nickname,
        image: image,
        email: email,
        password: password,
        password_confirmation: password_confirmation
      }
      await axios.post('/auth', payload)

      this.setState({ signedIn: true })

    } catch (error) {
      console.log(error)
    }
  }

  signIn = async (email, password) => {
    try {
      const payload = {
        email,
        password
      }
      await axios.post('/auth/sign_in', payload)

      this.setState({ signedIn: true })

    } catch (error) {
      console.log(error)
    }
  }

  render() {

    const SignUpComponent = () => (
      <SignUp
        signUp={this.signUp} />
    )
    const LogInComponent = () => (
      <LogIn
        signIn={this.signIn} />
    )

    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/signup" render={SignUpComponent} />
            <Route exact path="/login" render={LogInComponent} />
          </Switch>

        </div>
      </Router>
    )
  }
}

export default App
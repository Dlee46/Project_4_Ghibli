import React, { Component } from 'react'
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import SignUp from './components/SignUp'
import LogIn from './components/LogIn'
import axios from 'axios'
import MoviesList from './components/MoviesList';
import { saveAuthTokens, clearAuthTokens, userIsLoggedIn, setAxiosDefaults } from './utils/SessionHeaderUtil';

class App extends Component {
  state = {
    signedIn: false,
    movies: [],
    reviews: []
  }
  async componentDidMount() {
    try {
      const signedIn = userIsLoggedIn()
      let movies = []
      if (signedIn) {
        setAxiosDefaults()
        movies = await this.getMovies()
      }
      this.setState({
        movies, signedIn
      })
    } catch (error) {
      console.error(error)
    }
  }
  getMovies = async () => {
    try {
      const res = await axios.get('/api/movies/')
      console.log("FETCH", res)
      return res.data
    } catch (error) {
      console.error(error)
      return []
    }
  }
  signUp = async (name, nickname, image, email, password, password_confirmation) => {
    try {
      const payload = {
        name,
        nickname,
        image,
        email,
        password,
        password_confirmation
      }
      const res = await axios.post('/auth', payload)
      saveAuthTokens(res.headers)
      this.setState({
        signedIn: true
      })
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
      const res = await axios.post('/auth/sign_in', payload)
      saveAuthTokens(res.headers)
      this.setState({
        signedIn: true
      })

    } catch (error) {
      console.log(error)
    }
  }

  signOut = async (event) => {
    try {
      event.preventDefault()

      await axios.delete('/auth/sign_out')

      clearAuthTokens();

      this.setState({ signedIn: false })
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
    const MoviesComponent = () => (
      <MoviesList
        movies={this.state.movies} />
    )
    // const ReviewsComponent = () => (

    // )

    return (
      <Router>
        <div>
          <Switch>

            <Route exact path="/signup" render={SignUpComponent} />
            <Route exact path="/login" render={LogInComponent} />
            <Route exact path="/movies" render={MoviesComponent} />
            {/* <Route exact path='/movies/:id/reviews' render={ReviewsComponent} /> */}
          </Switch>
          {this.state.signedIn ? <Redirect to="/movies" /> : null}
        </div>
      </Router>
    )
  }
}

export default App
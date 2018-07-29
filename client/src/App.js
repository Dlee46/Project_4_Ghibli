import React, { Component } from 'react'
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import SignUp from './components/SignUp'
import LogIn from './components/LogIn'
import axios from 'axios'
import MoviesList from './components/MoviesList'
import { saveAuthTokens, clearAuthTokens, userIsLoggedIn, setAxiosDefaults } from './utils/SessionHeaderUtil';
import Movie from './components/Movie';
import ReviewList from './components/ReviewList';
import Review from './components/Review';
import { Button } from '../../node_modules/semantic-ui-react';

class App extends Component {
  state = {
    signedIn: false,
    movies: [],
    ghibliMovies: []
  }
  async componentDidMount() {
    try {
      const signedIn = userIsLoggedIn()
      let movies = []
      await this.getGhibliApi()
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
      return res.data
    } catch (error) {
      console.error(error)
      return []
    }
  }
  signUp = async (email, password, password_confirmation) => {
    try {
      const payload = {
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

  getGhibliApi = () => {
    axios.get(`https://ghibliapi.herokuapp.com/films/`)
      .then((res) => {
        this.setState({ ghibliMovies: res.data })
      })

  }
  render() {
    const SignUpComponent = (props) => (
      <SignUp
        {...props}
        signUp={this.signUp} />
    )
    const LogInComponent = (props) => (
      <LogIn
        {...props}
        signIn={this.signIn} />
    )

    const MoviesComponent = (props) => (
      <MoviesList {...props}
        movies={this.state.movies} signOut={this.signOut} signedIn={this.state.signedIn} ghibliMovies={this.state.ghibliMovies} />
    )
    const MovieComponent = (props) => (
      <Movie {...props} movies={this.state.movies} signOut={this.signOut} signedIn={this.state.signedIn} />
    )
    const ReviewsComponent = (props) => (
      <Review {...props} movies={this.state.movies} signOut={this.signOut} signedIn={this.state.signedIn} />
    )

    return (
      <Router>
        <div>
          {this.state.signedIn ? <Button onClick={this.signOut}>Sign Out</Button>
            : null}
          <Switch>
            <Route exact path="/" render={MoviesComponent} />
            <Route exact path="/signup" render={SignUpComponent} />
            <Route exact path="/login" render={LogInComponent} />
            <Route exact path="/movies/:id/reviews" render={MovieComponent} />
            <Route exact path='/movies/:movieId/reviews/:id' render={ReviewsComponent} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
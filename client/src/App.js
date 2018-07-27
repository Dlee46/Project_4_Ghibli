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
        movies={this.state.movies} signOut={this.signOut} signedIn={this.state.signedIn} />
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
          {this.state.signedIn ? <button onClick={this.signOut}>Sign Out</button>
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
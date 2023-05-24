import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Popular extends Component {
  state = {
    apiStatus: apiStatusConstants.inProgress,
    popularMoviesList: [],
  }

  componentDidMount() {
    this.getPopularMoviesApi()
  }

  getPopularMoviesApi = async () => {
    this.setState({apiStatus: apiStatusConstants.initial})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.results.map(eachMovie => ({
        id: eachMovie.id,
        backdropPath: eachMovie.backdrop_path,
        title: eachMovie.title,
        posterPath: eachMovie.poster_path,
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        popularMoviesList: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {popularMoviesList} = this.state
    return (
      <ul className="moviesList">
        {popularMoviesList.map(eachMovie => (
          <li className="movieItem" key={eachMovie.id}>
            <Link to={`/movies/${eachMovie.id}`} className="movieItemLink">
              <img
                src={eachMovie.posterPath}
                alt={eachMovie.title}
                className="movieImg"
              />
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  onRetry = () => {
    this.getPopularMoviesApi()
  }

  renderFailureView = () => (
    <div className="failed-view">
      <img
        className="failed-image"
        src="https://res.cloudinary.com/dyx9u0bif/image/upload/v1657426934/homepage-failure_egb8fl.png"
        alt="failure view"
      />
      <p className="failed-heading">Something went wrong. Please try again</p>
      <button className="retry-btn" type="button" onClick={this.onRetry}>
        Try Again
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader
        testid="loader"
        type="TailSpin"
        height={35}
        width={380}
        color=" #D81F26"
      />
    </div>
  )

  popularMoviesListResults = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()

      default:
        return this.renderLoadingView()
    }
  }

  render() {
    return (
      <div className="popularContainer">
        <Header />
        {this.popularMoviesListResults()}
        <Footer />
      </div>
    )
  }
}

export default Popular

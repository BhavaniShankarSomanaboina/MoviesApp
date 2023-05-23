import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import HomePoster from '../HomePoster'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    movieDetails: {},
  }

  componentDidMount() {
    this.getMovieDetailsApi()
  }

  getMovieDetailsApi = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const movieDetails = data.movie_details
      const updatedData = {
        adult: movieDetails.adult,
        backdropPath: movieDetails.backdrop_path,
        budget: movieDetails.budget,
        genres: movieDetails.genres,
        id: movieDetails.id,
        overview: movieDetails.overview,
        posterPath: movieDetails.poster_path,
        releaseDate: movieDetails.release_date,
        runtime: movieDetails.runtime,
        similarMovies: movieDetails.similar_movies.map(eachSimilarMovie => ({
          backdropPath: eachSimilarMovie.backdrop_path,
          id: eachSimilarMovie.id,
          overview: eachSimilarMovie.overview,
          posterPath: eachSimilarMovie.poster_path,
          title: eachSimilarMovie.title,
        })),
        spokenLanguages: movieDetails.spoken_languages.map(eachLanguage => ({
          id: eachLanguage.id,
          englishName: eachLanguage.english_name,
        })),
        title: movieDetails.title,
        voteAverage: movieDetails.vote_average,
        voteCount: movieDetails.vote_count,
      }

      this.setState({
        apiStatus: apiStatusConstants.success,
        movieDetails: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {apiStatus, movieDetails} = this.state

    return (
      <div>
        <HomePoster poster={movieDetails} apiStatus={apiStatus} />
        <div className="aboutMovieContainer">
          <div className="DetailsContainer">
            <h1 className="TopicHeading">Genres</h1>
            <ul className="TopicsContainer">
              {movieDetails.genres.map(eachGenre => (
                <li key={eachGenre.id} className="topicItem">
                  <p className="topicName">{eachGenre.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="DetailsContainer">
            <h1 className="TopicHeading">Audio Available</h1>
            <ul className="TopicsContainer">
              {movieDetails.spokenLanguages.map(eachAudio => (
                <li key={eachAudio.id} className="topicItem">
                  <p className="topicName">{eachAudio.englishName}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="DetailsContainer">
            <div className="ratingCount">
              <h1 className="TopicHeading">Rating Count </h1>
              <p className="topicName">{movieDetails.voteCount}</p>
            </div>
            <div className="ratingAvg">
              <h1 className="TopicHeading">Rating Average</h1>
              <p className="topicName">{movieDetails.voteAverage}</p>
            </div>
          </div>
          <div className="DetailsContainer">
            <div className="budget">
              <h1 className="TopicHeading">Budget </h1>
              <p className="topicName">{movieDetails.budget}</p>
            </div>
            <div className="releaseDate">
              <h1 className="TopicHeading">Release Date</h1>
              <p className="topicName">{movieDetails.releaseDate}</p>
            </div>
          </div>
        </div>
        <h1 className="Heading">More like this</h1>
        <ul className="similarMoviesContainer">
          {movieDetails.similarMovies.map(eachMovie => (
            <li key={eachMovie.id} className="SimilarMovieItem">
              <img
                src={eachMovie.posterPath}
                alt={eachMovie.title}
                className="SimilarMovieImg"
              />
            </li>
          ))}
        </ul>
        <Footer />
      </div>
    )
  }

  onRetry = () => {
    this.getMovieDetailsApi()
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

  MovieDetailsResults = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  render() {
    const {apiStatus} = this.state
    return (
      <div className="MoviesContainer">
        {apiStatus !== 'SUCCESS' && <Header />}
        {this.MovieDetailsResults()}
      </div>
    )
  }
}

export default MovieItemDetails

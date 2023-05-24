import './index.css'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Search extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    searchedMovies: [],
  }

  onClickSearchBtn = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.results.map(eachResult => ({
        backdropPath: eachResult.backdrop_path,
        id: eachResult.id,
        overview: eachResult.overview,
        posterPath: eachResult.poster_path,
        title: eachResult.title,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        searchedMovies: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  searchInput = text => {
    this.setState({searchInput: text})
  }

  // eslint-disable-next-line react/self-closing-comp
  renderInitialView = () => <div className="initialContainer"></div>

  renderSuccessView = () => {
    const {searchedMovies, searchInput} = this.state
    const NoMovies = searchedMovies.length === 0
    console.log('renderSuccessView called')

    return (
      <>
        {NoMovies ? (
          <div className="NoMoviesContainer">
            <div className="NoMoviesImg-container">
              <h1 className="noMoviesHeading">Uh oh!</h1>
            </div>
            <p className="noMoviesText">{`Your search for ${searchInput} did not find any matches.`}</p>
          </div>
        ) : (
          <ul className="searchedMoviesContainer">
            {searchedMovies.map(eachMovie => (
              <Link to={`/movies/${eachMovie.id}`} key={eachMovie.id}>
                <li key={eachMovie.id} className="searched-MovieItem">
                  <img
                    src={eachMovie.posterPath}
                    alt={eachMovie.title}
                    className="movieImg"
                  />
                </li>
              </Link>
            ))}
          </ul>
        )}
      </>
    )
  }

  onRetry = () => {
    this.onClickSearchBtn()
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
      <Loader type="TailSpin" height={35} width={380} color=" #D81F26" />
    </div>
  )

  renderSearchResults = () => {
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
    return (
      <div className="searchContainer">
        <Header
          searchInput={this.searchInput}
          onClickSearchBtn={this.onClickSearchBtn}
        />
        {this.renderSearchResults()}
      </div>
    )
  }
}

export default Search

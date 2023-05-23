/* eslint-disable react/no-unused-state */
import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
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

  render() {
    return (
      <div className="searchContainer">
        <Header
          searchInput={this.searchInput}
          onClickSearchBtn={this.onClickSearchBtn}
        />
        {this.renderInitialView()}
      </div>
    )
  }
}

export default Search

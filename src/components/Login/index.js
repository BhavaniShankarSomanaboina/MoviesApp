import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value, showSubmitError: false})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value, showSubmitError: false})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onFormSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bgContainer">
        <img
          src="https://res.cloudinary.com/dsg22ck0f/image/upload/v1684419117/Group_7399_1x_z1dmnd.png"
          className="moviesLogo"
          alt="login website logo"
        />
        <form className="LoginFormContainer" onSubmit={this.onFormSubmit}>
          <h1 className="LoginHeading">Login</h1>
          <label htmlFor="username" className="Label">
            USERNAME
          </label>
          <input
            type="text"
            placeholder="USERNAME"
            className="Input"
            value={username}
            id="username"
            onChange={this.onChangeUserName}
          />
          <br />
          <label htmlFor="password" className="Label">
            PASSWORD
          </label>
          <input
            type="password"
            placeholder="PASSWORD"
            className="Input"
            value={password}
            id="password"
            onChange={this.onChangePassword}
          />
          <br />
          {showSubmitError && <p className="errorMessage">{errorMsg}</p>}
          <button type="submit" className="LoginBtn">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default Login

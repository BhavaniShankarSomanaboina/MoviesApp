import './index.css'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'

const Account = props => {
  const username = localStorage.getItem('username')
  // eslint-disable-next-line no-unused-vars
  const password = localStorage.getItem('password')

  const passwordInAsterisk = '*'.repeat(10)

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="AccountContainer">
      <Header />
      <div className="userDetailsContainer">
        <h1 className="AccountHeading">Account</h1>
        <hr />
        <div className="MemberInfo">
          <p className="category">Member ship</p>
          <div className="details">
            <p className="text">{username}@gmail.com</p>
            <p className="password">Password : {passwordInAsterisk}</p>
          </div>
        </div>
        <hr />
        <div className="MemberInfo">
          <p className="category">Plan details</p>
          <div className="typeDetails">
            <p className="text">Premium</p>
            <p className="UltraText">Ultra HD</p>
          </div>
        </div>
        <hr />
        <button type="button" className="LogoutBtn" onClick={onClickLogout}>
          Logout
        </button>
      </div>
      <Footer />
    </div>
  )
}

export default Account

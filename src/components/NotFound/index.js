import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="bgContainer">
    <div className="notFoundContainer">
      <h1 className="NotFoundHeading">Lost Your Way</h1>
      <p className="NotFoundPara">
        we are sorry, the page you requested could not be found Please go back
        to the homepage.
      </p>
      <Link to="/" className="ButtonLink">
        <button type="button" className="HomeBtn">
          Go to Home
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound

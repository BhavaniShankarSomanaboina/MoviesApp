import './index.css'
import {withRouter} from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import {intervalToDuration} from 'date-fns'
import Header from '../Header'

const HomePoster = props => {
  const {poster, apiStatus} = props
  const {backdropPath, title, overview} = poster
  const {history} = props
  const {location} = history
  const {pathname} = location

  const isTrue = pathname.startsWith('/movies/')

  const MovieItemDetailsView = () => {
    const {runtime, releaseDate, adult} = poster
    const year = new Date(releaseDate).getFullYear()
    const time = intervalToDuration({start: 0, end: runtime * 60 * 1000})

    const {hours, minutes} = time

    return (
      <div className="durationContainer">
        <p className="info">
          {hours}h {minutes}m
        </p>

        {adult ? <p className="info">A</p> : <p className="UAinfo">U/A</p>}
        <p className="info">{year}</p>
      </div>
    )
  }

  return (
    <>
      <div
        className="devices-container"
        alt={title}
        style={{
          backgroundImage: `url(${backdropPath})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {apiStatus === 'SUCCESS' && (
          <Header style={{backgroundColor: 'transparent', width: '100vw'}} />
        )}
        <div className=" home-header-content heading-container">
          <h1 className=" movie-details-name home-poster-title">{title}</h1>
          {isTrue ? MovieItemDetailsView() : ''}
          <p className=" movie-details-description home-poster-overview">
            {overview}
          </p>
          <button
            className=" movies-details-play-button  home-poster-play-btn"
            type="button"
          >
            Play
          </button>
        </div>
      </div>
      {/* <div
        className="lg-devices"
        style={{
          backgroundImage: `url(${backdropPath})`,
          backgroundSize: '100% 100%',
          height: '100%',
        }}
      >
        <div className="heading-container">
          <h1 className="home-poster-title">{title}</h1>
          <p className="home-poster-overview">{overview}</p>
          <button className="home-poster-play-btn" type="button">
            Play
          </button>
        </div>
      </div> */}
    </>
  )
}

export default withRouter(HomePoster)

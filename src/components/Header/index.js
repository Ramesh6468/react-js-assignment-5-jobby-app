import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickButton = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <ul className="HeaderContainer">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="logo"
        />
      </Link>
      <div className="card">
        <Link to="/">
          <li>
            <p className="Home">Home</p>
          </li>
        </Link>
        <Link to="/jobs">
          <li>
            <p className="Home">Jobs</p>
          </li>
        </Link>
      </div>
      <li>
        <button className="button" type="button" onClick={onClickButton}>
          Logout
        </button>
      </li>
    </ul>
  )
}
export default withRouter(Header)

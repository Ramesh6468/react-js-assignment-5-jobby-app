import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'

const initialApiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class ProfileSection extends Component {
  state = {profileData: {}, apiStatus: initialApiStatus.initial}

  componentDidMount() {
    this.getProfie()
  }

  getFormattedData = Data => ({
    name: Data.name,
    profileImageUrl: Data.profile_image_url,
    shortBio: Data.short_bio,
  })

  getProfie = async () => {
    this.setState({apiStatus: initialApiStatus.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    console.log(response)
    if (response.ok) {
      const Data = await response.json()
      console.log(Data)
      const updatedData = this.getFormattedData(Data.profile_details)
      console.log(updatedData)
      this.setState({
        profileData: updatedData,
        apiStatus: initialApiStatus.success,
      })
    } else {
      this.setState({apiStatus: initialApiStatus.failure})
    }
  }

  onClickButton = () => {
    this.getProfie()
  }

  getSuccessView = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData
    return (
      <div className="profileSection">
        <img src={profileImageUrl} alt="profile" className="profileImage" />
        <h1 className="name">{name}</h1>
        <p className="role">{shortBio}</p>
      </div>
    )
  }

  getFailureView = () => (
    <button className="button" type="button" onClick={this.onClickButton}>
      Retry
    </button>
  )

  getLoadingView = () => (
    <div data-testid="loader" className="loaderContainer">
      <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
    </div>
  )

  getApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case initialApiStatus.success:
        return this.getSuccessView()
      case initialApiStatus.failure:
        return this.getFailureView()
      case initialApiStatus.loading:
        return this.getLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div className="bgContainerProfile">{this.getApiStatus()}</div>
  }
}

export default ProfileSection

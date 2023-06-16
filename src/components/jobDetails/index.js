import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {TiShoppingBag} from 'react-icons/ti'
import {BsBoxArrowInUpRight} from 'react-icons/bs'
import Header from '../Header'
import SimilarJobItem from '../similarJobItems'
import './index.css'

const initialApiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class JobDetails extends Component {
  state = {
    jobDetailsData: [],
    similarData: [],
    apiStatus: initialApiStatus.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getFormattedLife = each => ({
    description: each.description,
    imageUrl: each.image_url,
  })

  getFormattedSkill = each => ({
    imageUrl: each.image_url,
    name: each.name,
  })

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    skills: data.skills.map(each => this.getFormattedSkill(each)),
    lifeAtCompany: this.getFormattedLife(data.life_at_company),
    location: data.location,
    rating: data.rating,
    packagePerAnnum: data.package_per_annum,
    title: data.title,
  })

  getFormattedSimilarData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    title: data.title,
  })

  getJobDetails = async () => {
    this.setState({apiStatus: initialApiStatus.loading})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    console.log(match)
    console.log(jwtToken)
    const id2 = id.slice(1)
    console.log(id2)

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    console.log(options)
    const response = await fetch(url, options)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedData = this.getFormattedData(data.job_details)
      console.log(updatedData)
      this.setState({
        jobDetailsData: updatedData,
        apiStatus: initialApiStatus.success,
      })
      const updatedSimilarData = data.similar_jobs.map(each =>
        this.getFormattedSimilarData(each),
      )
      console.log(updatedSimilarData)
      this.setState({
        similarData: updatedSimilarData,
        apiStatus: initialApiStatus.success,
      })
    }
    else {
      this.setState({ apiStatus : initialApiStatus.failure})
      }
  }

  getSuccessView = () => {
    const {jobDetailsData, similarData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      rating,
      packagePerAnnum,
      title,
    } = jobDetailsData
    console.log('skill')
    console.log(skills)
    console.log(lifeAtCompany)
    const isSkillsAvailable = skills && skills.length > 0
    console.log(isSkillsAvailable)
    const islifeAtComapny =
      lifeAtCompany && Object.keys(lifeAtCompany).length > 0
    console.log(islifeAtComapny)
    return (
      <>
        <li>
          <Header />
        </li>
        <div className="jobCard">
          <div className="jobDetailsCard">
            <div className="topCard1">
              <img
                src={companyLogoUrl}
                className="logo2"
                alt="job details company logo"
              />
              <div className="headingCard">
                <h1 className="title3">{title}</h1>
                <div className="ratingCard">
                  <AiFillStar className="starIcon" />
                  <p className="rating">{rating}</p>
                </div>
              </div>
            </div>
            <div className="locationCard">
              <div className="card2">
                <div className="location1">
                  <MdLocationOn className="locationIcon" />
                  <p className="location">{location}</p>
                </div>
                <div className="typeCard">
                  <TiShoppingBag className="bagIcon" />
                  <p className="type">{employmentType}</p>
                </div>
              </div>
              <p className="salary">{packagePerAnnum}</p>
            </div>
            <hr className="line" />

            <div className="descriptionCard">
              <div className="visitCard">
                <h1 className="description">Description</h1>
                <div className="visitImage">
                  <a href={companyWebsiteUrl} className="link1">
                    Visit
                  </a>
                  <BsBoxArrowInUpRight className="arrowIcon" />
                </div>
              </div>
              <p className="para4">{jobDescription}</p>
            </div>

            <li className="skillCard">
              <h1 className="skillTitle">Skills</h1>
              {isSkillsAvailable ? (
                <ul className="skillContainer">
                  {skills.map(each => (
                    <li key={each.name} className="skillItem">
                      <img
                        src={each.imageUrl}
                        alt={each.name}
                        className="skillImage"
                      />
                      <p>{each.name}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                'no Skills'
              )}
            </li>

            <div className="lifeCard">
              <h1 className="lifeTitle">Life At Company</h1>
              {islifeAtComapny ? (
                <div className="lifeCard1">
                  <p className="para4">{lifeAtCompany.description}</p>
                  <img
                    src={lifeAtCompany.imageUrl}
                    alt="life at company"
                    className="lifeImage"
                  />
                </div>
              ) : (
                'error'
              )}
            </div>
          </div>

          <li className="similarContainer">
            <>
              <h1 className="title">Similar Jobs</h1>
              <ul className="similarJobList">
                {similarData.map(each => (
                  <SimilarJobItem key={each.id} similarJobDetails={each} />
                ))}
              </ul>
            </>
          </li>
        </div>
      </>
    )
  }

  getLoadingView = () => (
    <li>
      <>
        <Header />
        <div data-testid="loader" className="loaderContainer">
          <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
        </div>
      </>
    </li>
  )

  onClickButton = () => {
    this.getJobDetails()
  }

  getFailureView = () => (
    <li>
      <>
        <Header />
        <div className="failureCard1">
          <img
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
            alt="failure view"
            className="failureImage"
          />
          <h1 className="error">Oops! Something Went Wrong</h1>
          <p className="errorMsg">
            We cannot seem to find the page you are looking for
          </p>
          <button className="button" type="button" onClick={this.onClickButton}>
            Retry
          </button>
        </div>
      </>
    </li>
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
    return (
      <>
        <ul className="list">
          <div className="bgContainer3">{this.getApiStatus()}</div>
        </ul>
      </>
    )
  }
}

export default JobDetails

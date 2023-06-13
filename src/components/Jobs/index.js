import {Component} from 'react'
import {BiSearch} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import ProfileSection from '../profileSection'
import FilterSection from '../filterSection'
import Header from '../Header'
import JobCard from '../jobCard'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const initialApiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Jobs extends Component {
  state = {
    jobData: [],
    activeEmployId: [],
    activeSalaryId: '',
    searchInput: '',
    apiStatus: initialApiStatus.initial,
  }

  componentDidMount() {
    this.getJobs()
  }

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    title: data.title,
  })

  getJobs = async () => {
    this.setState({apiStatus: initialApiStatus.loading})
    const {activeEmployId, activeSalaryId, searchInput} = this.state
    const employeeList = activeEmployId.join()
    console.log('rrrr')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employeeList}&minimum_package=${activeSalaryId}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.jobs.map(each => this.getFormattedData(each))
      console.log(updatedData)
      this.setState({jobData: updatedData, apiStatus: initialApiStatus.success})
    } else {
      this.setState({apiStatus: initialApiStatus.failure})
    }
  }

  getSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    this.getJobs()
  }

  changePackage = activeSalaryId => {
    this.setState({activeSalaryId}, this.getJobs)
  }

  changeEmployment = id => {
    this.setState(
      prevState => ({
        activeEmployId: [...prevState.activeEmployId, id],
      }),
      this.getJobs,
    )
  }

  getSuccessView = () => {
    const {jobData, searchInput} = this.state
    const isShowJobsData = jobData.length > 0
    console.log(isShowJobsData)
    return (
      <>
        <div className="jobContainer">
          <div className="leftCard">
            <ProfileSection />
            <hr className="line" />
            <div className="filterCard1">
              <FilterSection
                employmentTypesList={employmentTypesList}
                salaryRangesList={salaryRangesList}
                changeEmployment={this.changeEmployment}
                changePackage={this.changePackage}
              />
            </div>
          </div>
          <div className="rightCard">
            <div className="inputContainer">
              <input
                type="search"
                placeholder="Search"
                className="input3"
                onChange={this.getSearch}
                value={searchInput}
              />
              <button
                onClick={this.onClickSearch}
                className="button5"
                type="button"
                data-testid="searchButton"
              >
                <BiSearch className="icon1" />
              </button>
            </div>
            {isShowJobsData ? (
              <ul className="job-list">
                {jobData.map(each => (
                  <JobCard key={each.id} jobDetails={each} />
                ))}
              </ul>
            ) : (
              <div className="noJobCard">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                  alt="no jobs"
                  className="noJobImage"
                />
                <h1 className="error">No Jobs Found</h1>
                <p className="errorMsg">
                  We could not find any jobs. Try other filters
                </p>
              </div>
            )}
          </div>
        </div>
      </>
    )
  }

  onClickButton = () => {
    this.getJobs()
  }

  getLoadingView = () => (
    <div data-testid="loader" className="loaderContainer">
      <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
    </div>
  )

  getFailureView = () => {
    const {searchInput} = this.state
    return (
      <div className="failureCard1">
        <div className="inputContainer">
          <input
            type="search"
            placeholder="Search"
            className="input3"
            onChange={this.getSearch}
            value={searchInput}
          />
          <button
            onClick={this.onClickSearch}
            className="button5"
            type="button"
          >
            <BiSearch className="icon1" />
          </button>
        </div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="failureImage"
        />
        <h1 className="error">Oops! Something Went Wrong</h1>
        <p className="errorMsg">
          We cannot seem to find the page you are looking for.
        </p>
        <button className="button" type="button" onClick={this.onClickButton}>
          Retry
        </button>
      </div>
    )
  }

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
        <Header />
        <div className="bgContainer2">{this.getApiStatus()}</div>
      </>
    )
  }
}

export default Jobs

import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {TiShoppingBag} from 'react-icons/ti'
import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  return (
    <Link to={`/jobs/${id}`}>
      <div className="jobCardContainer">
        <div className="top1">
          <img src={companyLogoUrl} className="logo1" alt="company logo" />
          <div className="nameCard">
            <h1 className="role1">{title}</h1>
            <div className="starCard">
              <AiFillStar className="starIcon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>

        <div className="locationCard">
          <div className="salaryCard">
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

        <div className="paraContainer">
          <h1 className="description">Description</h1>
          <p className="para2">{jobDescription}</p>
        </div>
      </div>
    </Link>
  )
}

export default JobCard

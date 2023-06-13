import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {TiShoppingBag} from 'react-icons/ti'
import './index.css'

const SimilarJobItem = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails
  console.log(similarJobDetails)

  console.log(jobDescription)

  return (
    <li className="similarJobItemCard">
      <div className="topCard3">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="logo5"
        />
        <div className="titleCard3">
          <h1 className="title3">{title}</h1>
          <div className="ratingCard">
            <AiFillStar className="starIcon" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>

      <div className="descriptionCard4">
        <h1 className="description">Description</h1>
        <p className="para4">{jobDescription}</p>
      </div>

      <div className="bottomcard">
        <div className="locationcard3">
          <MdLocationOn className="locationIcon" />
          <p className="location">{location}</p>
        </div>
        <div className="typeCard3">
          <TiShoppingBag className="bagIcon" />
          <p className="type">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem

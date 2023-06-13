import './index.css'

const FilterGroup = props => {
  const getTypesOfSalaryRange = () => {
    const {salaryRangesList} = props
    return (
      <ul className="listContainer">
        {salaryRangesList.map(eachType => {
          const {changePackage} = props
          const onSalary = () => changePackage(eachType.salaryRangeId)
          return (
            <li
              key={eachType.salaryRangeId}
              onClick={onSalary}
              className="item"
            >
              <input
                type="radio"
                id={eachType.salaryRangeId}
                name="package"
                value={eachType.label}
              />
              <label htmlFor={eachType.salaryRangeId}>{eachType.label}</label>
            </li>
          )
        })}
      </ul>
    )
  }

  const getTypesOfEmployments = () => {
    const {employmentTypesList} = props
    console.log('emp')
    console.log(employmentTypesList)
    return (
      <ul className="listContainer">
        {employmentTypesList.map(eachType => {
          const {changeEmployment} = props
          const onEmployment = () => changeEmployment(eachType.employmentTypeId)
          return (
            <li
              key={eachType.employmentTypeId}
              onClick={onEmployment}
              className="item"
            >
              <input
                type="checkbox"
                id={eachType.employmentTypeId}
                value={eachType.label}
              />
              <label htmlFor={eachType.employmentTypeId}>
                {eachType.label}
              </label>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div className="filterContainer">
      <h1 className="heading">Type Of Employment</h1>
      {getTypesOfEmployments()}
      <h1 className="heading">Salary Range</h1>
      {getTypesOfSalaryRange()}
    </div>
  )
}

export default FilterGroup

import './index.css'

const Tags = props => {
  const {eachItem, btnClick} = props
  const {displayText, optionId} = eachItem

  const onCickBtn = () => {
    btnClick(optionId)
  }

  return (
    <li>
      <button className="btn" onClick={onCickBtn} type="button">
        {displayText}
      </button>
    </li>
  )
}

export default Tags

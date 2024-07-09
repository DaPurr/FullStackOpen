import { useState } from 'react'

const Togglable = ({ buttonText, children }) => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  const showWhenVisibleStyle = { display: isVisible ? '' : 'none' }
  const hideWhenVisibleStyle = { display: isVisible ? 'none' : '' }

  return (
    <div>
      <div style={hideWhenVisibleStyle}>
        <button onClick={toggleVisibility}>{buttonText}</button>
      </div>
      <div style={showWhenVisibleStyle}>
        {children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

export default Togglable

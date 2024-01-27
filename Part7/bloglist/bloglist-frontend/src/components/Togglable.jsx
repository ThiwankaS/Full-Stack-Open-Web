import { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from '../assets/styledComponents'

const Togglable = (props) => {

  const [ visibility,setVisibility ] = useState(false)

  const hideWhenVisibility = { display : visibility ? 'none' : '' }
  const showWhenVisibility = { display : visibility ? '' : 'none' }

  const toggaleVisibility = () => {
    setVisibility(!visibility)
  }

  return (
    <div>
      <div style={hideWhenVisibility}>
        <Button id='toggalbe-button' onClick={toggaleVisibility}>{props.buttonLable}</Button>
      </div>
      <div style={showWhenVisibility}>
        {props.children}
        <Button onClick={toggaleVisibility}>Cancel</Button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  buttonLable : PropTypes.string.isRequired
}

export default Togglable
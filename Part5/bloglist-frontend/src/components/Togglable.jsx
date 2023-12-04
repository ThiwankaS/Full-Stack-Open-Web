import { useState } from "react"

const Togglable = (props) => {

    const [ visibility,setVisibility ] = useState(false)

    const hideWhenVisibility = { display : visibility ? 'none' : ''}
    const showWhenVisibility = { display : visibility ? '' : 'none'}

    const toggaleVisibility = () => {
        setVisibility(!visibility)
    }

    return (
        <div>
            <div style={hideWhenVisibility}>
                <button onClick={toggaleVisibility}>{props.buttonLable}</button>
            </div>
            <div style={showWhenVisibility}>
                {props.children}
                <button onClick={toggaleVisibility}>Cancel</button>
            </div>
        </div>
    )
}

export default Togglable
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


const App = () => {

  const [ good , setGood ] =  useState(0); 
  const [ neutral, setNeutral ] = useState(0);
  const [ bad, setBad ] = useState(0);  

  return (
    <div>
      <h4>Give Feedback</h4>
      <br/>
      <Button handelClick={() => setGood(good + 1)} text='good' />
      <Button handelClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handelClick={() => setBad(bad + 1)} text='bad' />
      <br/>
      <h3>Statistics</h3>
      <br/>
      <Feedback text='good' stat={good}/>
      <Feedback text='neutral' stat={neutral}/>
      <Feedback text='bad' stat={bad}/>
    </div>
  )
}

const Button = (props) => {
  const { text,handelClick } = props; 
  return(
    <button onClick={handelClick}>{text}</button>
  )
}

const Feedback = (props) => {
  const { text,stat } = props; 
  return (
    <div>{text} : {stat} </div>
  )
}

export default App

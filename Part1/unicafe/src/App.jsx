import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


const App = () => {

  const [ good , setGood ] =  useState(0); 
  const [ neutral, setNeutral ] = useState(0);
  const [ bad, setBad ] = useState(0);  
  const [ all, setAll ] = useState(0); 

  const setGoodFeedbackCount = () => {
    const newGoodCount = good + 1 ; 
    setGood(newGoodCount); 
    setAll(newGoodCount + neutral + bad); 
  }

  const setNeutralFeedbackCount = () => {
    const newNeutralCount = neutral + 1 ; 
    setNeutral(newNeutralCount); 
    setAll(good + newNeutralCount + bad); 
  }

  const setBadFeednackCount = () => {
    const newBadCount = bad + 1 ; 
    setBad(newBadCount); 
    setAll(good + neutral + newBadCount); 
  }
  
  return (
    <div>
      <h4>Give Feedback</h4>
      <br/>
      <Button handelClick={setGoodFeedbackCount} text='good' />
      <Button handelClick={setNeutralFeedbackCount} text='neutral' />
      <Button handelClick={setBadFeednackCount} text='bad' />
      <br/>
      <h3>Statistics</h3>
      <br/>
      <Feedback text='good' stat={good}/>
      <Feedback text='neutral' stat={neutral}/>
      <Feedback text='bad' stat={bad}/>
      <br/>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
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

const Statistics = (props) => {
  const { good,neutral,bad,all } = props; 
  if (all === 0){
    return (
      <div>No Feedback given!</div>
    )
  } else {
    return(
      <div>
        <div>all : {all}</div>
        <div>average : { ((good * 1) + (neutral * 0) + (bad * -1) )/all}</div>
        <div>positive : { (good/all) * 100 } % </div>
      </div>
    )
  }
} 

export default App

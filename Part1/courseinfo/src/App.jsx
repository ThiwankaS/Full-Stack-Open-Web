import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

const App = () => {

  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  return (

    <div>
    <Header course={course} />
    <Content part={[part1, part2, part3]} exercises={[exercises1, exercises2, exercises3]} />
    <Total exercises={[exercises1, exercises2, exercises3]} />
    </div>
  )
}
//Header, Content, Total are components
const Header = (props) => { 
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}
//Refactoring the Content component
const Content = (props) => {
  return (
    <div>
      <Part partName={props.part[0]} exercisesNumber={props.exercises[0]} />
      <Part partName={props.part[1]} exercisesNumber={props.exercises[1]} />
      <Part partName={props.part[2]} exercisesNumber={props.exercises[2]} />
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.exercises[0] + props.exercises[1] + props.exercises[2]}</p>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.partName} {props.exercisesNumber}</p>
    </div>
  )
}

export default App; 

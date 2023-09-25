import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

const App = () => {

  const course = 'Half Stack application development';

  const part1 = { 
    name :'Fundamentals of React',
    exercises : 10 };

  const part2 = { 
    name : 'Using props to pass data',
    exercises : 7 };
  
  const part3 = { 
    name : 'State of a component',
    exercises : 14 };


  return (

    <div>
    <Header course={course} />
    <Content part={[part1.name, part2.name, part3.name]} exercises={[part1.exercises, part2.exercises, part3.exercises]} />
    <Total exercises={[part1.exercises, part2.exercises, part3.exercises]} />
    </div>
  )
}
//Header, Content, Total are components
const Header = (props) => { 
  console.log(props);
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}
//Refactoring the Content component
const Content = (props) => {
  console.log(props);
  return (
    <div>
      <Part partName={props.part[0]} exercisesNumber={props.exercises[0]} />
      <Part partName={props.part[1]} exercisesNumber={props.exercises[1]} />
      <Part partName={props.part[2]} exercisesNumber={props.exercises[2]} />
    </div>
  )
}

const Total = (props) => {
  console.log(props);
  return (
    <div>
      <p>Number of exercises {props.exercises[0] + props.exercises[1] + props.exercises[2]}</p>
    </div>
  )
}

const Part = (props) => {
  console.log(props);
  return (
    <div>
      <p>{props.partName} {props.exercisesNumber}</p>
    </div>
  )
}

export default App; 

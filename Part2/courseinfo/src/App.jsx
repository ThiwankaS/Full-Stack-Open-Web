import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


const App = ()  => {
  
  const course = {
    id : 1,
    name : 'Half Stack application development',
    parts : [
      {
        name : 'Fundamentals of react', 
        exercises : 10, 
        id : 1
      },
      {
        name : 'Using props to pass data',
        exercises : 7,
        id : 2
      },
      {
        name : 'State of a component',
        exercises : 14,
        id : 3
      },
      {
        name : 'Redux',
        exercises : 11,
        id : 4
      }
    ]
  }

  return <Course course={course} /> 
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </div>
  )
}

const Header = ({course}) => <h1>{course}</h1>

const Content = (props) => {  
  const {parts} = props; 
  return (
    <div>
    {
      parts.map(part =><Part key={part.id} name={part.name} exercises={part.exercises}/>)
    }
    </div>
  )
}

const Part = ({name,exercises}) => <p>{name} {exercises}</p> 

const Total = (prop) => {
  const {parts} = prop; 
  const totalExcercise = parts.reduce((sum,part)=> sum + part.exercises,0);  
  return(
    <p><strong>total of {totalExcercise} excercises</strong></p>
  )
}

export default App;
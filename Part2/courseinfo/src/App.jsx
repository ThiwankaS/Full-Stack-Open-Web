import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


const App = ()  => {
  
  const course = [
    {
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
  },
  {
    name : 'Node.js',
    id : 2, 
    parts : [
      {
        name : 'Routing',
        exercises : 3,
        id :1
      },
      {
        name : 'Middlewares',
        exercises : 7,
        id : 2
      }
    ]
  }
 ]

  return <Course course={course} /> 
}

const Course = ({course}) => {
  return (
    <div>
      <h1>Web development curriculum</h1>
      <Header course={course[0].name} />
      <Content parts={course[0].parts}/>
      <Total parts={course[0].parts} />
      <Header course={course[1].name} />
      <Content parts={course[1].parts}/>
      <Total parts={course[1].parts} />
    </div>
  )
}

const Header = ({course}) => <p style={{fontSize: '22px'}} ><strong>{course}</strong></p>

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
    <p style={{fontSize: '18px'}}><strong>total of {totalExcercise} excercises</strong></p>
  )
}

export default App;
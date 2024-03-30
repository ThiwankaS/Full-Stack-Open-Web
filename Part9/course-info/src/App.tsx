const App = () => {

  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name : "Fundamentals",
      exerciseCount : 10,
    },{
      name : "Using props to pass data",
      exerciseCount : 7,
    },{
      name : "Deeper type usage",
      exerciseCount : 14,
    }
  ];
  const totalExercises = courseParts.reduce((sum,part) => sum + part.exerciseCount,0)

  return (
    <div>
      <Header name={courseName}/>
      <Content content={courseParts}/>
      <Total total={totalExercises}/>
    </div>)
}
export default App;


const Header = ({ name } : { name : string }) => {
  return (
  <div>
    <h3>{name}</h3>
  </div>)
}

const Content = ({ content } : { content : Array<{name : string, exerciseCount : number}>}) => {
  return (
  <div>
    {content.map( part => <span key={part.name}> { part.name } { part.exerciseCount }<br /></span>)}
  </div>)
}

const Total = ({ total } : { total : number }) => {
  return (
  <div>
    <p>Number of exercises {total}</p>
  </div>)
}
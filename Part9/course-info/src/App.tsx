import { CoursePart } from "./types";
import { assertNever } from "./helper";

const App = () => {

  const courseName = "Half Stack application development";
  const courseParts : CoursePart [] = [
    {
      name : "Fundamentals",
      exerciseCount : 10,
      description: "This is an awesome course part",
      kind : "basic"
    },{
      name : "Using props to pass data",
      exerciseCount : 7,
      groupProjectCount: 3,
      kind :"group"
    },{
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind : "basic"
    },{
      name : "Deeper type usage",
      exerciseCount : 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind : "background"
    }, {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: [" nodejs ", " jest "],
      kind: "special"
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

const Content = ({ content } : { content : Array<CoursePart>}) => {
  return (
  <div>
      {content.map((part,index) => {
        return <Part part={part} key={index}/>
      })}
  </div>)
}

const Total = ({ total } : { total : number }) => {
  return (
  <div>
    <p>Number of exercises {total}</p>
  </div>)
}

const Part = ({ part } : { part : CoursePart }) => {
  const myStyle = {
    fontWeight: 'bold',
  };

  switch(part.kind){
    case "basic" :
      return <span><p style={myStyle}>{part.name} {part.exerciseCount}</p><i>{part.description}</i></span>;
    case "background" :
      return <span><p style={myStyle}>{part.name} {part.exerciseCount}</p><i>{part.description}</i><p>submit to {part.backgroundMaterial}</p></span>;
    case "group" :
      return <span><p style={myStyle}>{part.name} {part.exerciseCount}</p><p>project exercises {part.groupProjectCount}</p></span>;
    case "special" :
      return <span><p style={myStyle}>{part.name} {part.exerciseCount}</p><i>{part.description}</i><p>required skills : {part.requirements.toString()}</p></span>;
    default :
      return assertNever(part);
  }
}
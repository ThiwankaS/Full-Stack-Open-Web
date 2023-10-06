import { useState } from 'react'

const App = () => {

  const [ person,setPerson ] = useState([
    {name : 'Alto Hellas'},
    {name : 'Ada Lovelace'}
  ]); 

  const [ newName,setNewName ] = useState(' '); 

  const handelchange = (event) => {
    setNewName(event.target.value); 
  }

  const addPerson = (event) => {
    event.preventDefault(); 
    const newPerson = {
      name : newName
    }
    setPerson(person.concat(newPerson)); 
    setNewName(' '); 
  }


  return (
    <div>
      <h2>Phone Book</h2>
      <form onSubmit={addPerson}>
        <div> name : <input value={newName} onChange={handelchange}/> </div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      {person.map((person)=><p key={person.name}>{person.name}</p>)}
      <br/>
      <div>Debug : {newName}</div>
    </div>  
  )
}

export default App;

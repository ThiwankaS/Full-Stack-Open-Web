import { useState } from 'react'

const App = () => {

  const [ person,setPerson ] = useState([
    { 
      name : 'Alto Hellas',
      number : '040-123456' 
    },
    {
      name : 'Ada Lovelace',
      number : '39-44-5323523' 
    }
  ]); 

  const [ newName,setNewName ] = useState(''); 
  const [ newNumber,setNewNumber ] = useState('');

  const handelNameChange = (event) => {
    setNewName(event.target.value); 
  }

  const handelNumberChange = (event) => {
    setNewNumber(event.target.value); 
  }

  const addPerson = (event) => {
    event.preventDefault(); 
    const nameAlreadyExist = (person.some(person => person.name === newName)); 
    const numberAlreadyExist = (person.some(person => person.number === newNumber));
    if(nameAlreadyExist || numberAlreadyExist){
      nameAlreadyExist ? alert(`${newName} is already added to phonebook`): alert(`${newNumber} is already added to phonebook`);
      setNewName('');
      setNewNumber('');
    } else {
      const newPerson = {
        name: newName,
        number : newNumber
      }
      setPerson(person.concat(newPerson)); 
      setNewName(''); 
      setNewNumber('');
    }
  }


  return (
    <div>
      <h2>Phone Book</h2>
      <form onSubmit={addPerson}>
        <div> name : <input value={newName} onChange={handelNameChange}/> </div>
        <div> number : <input value={newNumber} onChange={handelNumberChange}/> </div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      {person.map((person)=><p key={person.name}>{person.name} : {person.number}</p>)}
      <br/>
    </div>  
  )
}

export default App;

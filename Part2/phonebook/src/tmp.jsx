import { useState } from 'react'

const App = () => {

  const [ person,setPerson ] = useState([
    { name : 'Alto Hellas', number : '040-123456', id : 1 },
    { name : 'Ada Lovelace',number : '39-44-5323523', id : 2 },
    { name : 'Linus Torvalds', number : '045-1793030', id : 3},
    { name : 'Dan Abramov', number : '12-43-234345', id : 4},
    { name : 'Mary Poppendieck', number : '39-23-6423122', id : 5}
  ]); 
  const [ newName,setNewName ] = useState(''); 
  const [ newNumber,setNewNumber ] = useState('');
  const [ filter,setFilter ] = useState('');

  const handelNameChange = (event) => {
    setNewName(event.target.value); 
  }

  const handelNumberChange = (event) => {
    setNewNumber(event.target.value); 
  }

  const handelSearch = (event) => {
    setFilter(event.target.value); 
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
        number : newNumber,
        id : person.length + 1
      }
      setPerson(person.concat(newPerson)); 
      setNewName(''); 
      setNewNumber('');
    }
  }

  
  return (
    <div>
      <h2>Phone Book</h2>
      <div> filter shown with : <input id="search" value={filter} onChange={handelSearch}/> </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div> name : <input id ="name" value={newName} onChange={handelNameChange}/> </div>
        <div> number : <input id="number" value={newNumber} onChange={handelNumberChange}/> </div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      {person.map((person) => <p key={person.id}>{person.name} : {person.number}</p>)}
      <br/>
      <div>Debug : {filter}</div>
    </div>  
  )
}

export default App;

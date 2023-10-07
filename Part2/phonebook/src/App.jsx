import { useState } from 'react'

const App = () => {
  //State declarionts 
  const [ person,setPerson ] = useState([
    { name : 'Alto Hellas', number : '040-123456', id : 1 },
    { name : 'Ada Lovelace',number : '39-44-5323523', id : 2 },
    { name : 'Linus Torvalds', number : '045-1793030', id : 3},
    { name : 'Dan Abramov', number : '12-43-234345', id : 4},
    { name : 'Mary Poppendieck', number : '39-23-6423122', id : 5}
  ]); 
  const [ newName,setNewName ] = useState(''); 
  const [ newNumber,setNewNumber ] = useState('');
  const [ search,setSearch ] = useState(''); 
  const [ showAll,setShowAll ] = useState(true);  
  const [ filteredList,setFilteredList ] = useState([]); 

  //Event Handlers
  const handelNameChange = (event) => {
    setNewName(event.target.value); 
  }
  const handelNumberChange = (event) => {
    setNewNumber(event.target.value); 
  }
  const handelSearch = (event) => {
    if(event.target.value === ' '){
      setShowAll(true);
      console.log('Inside handelSearch: if [person]',person); 
    } else {
      setSearch(event.target.value); 
      setShowAll(false); 
      const newPersonArray = person.slice();
      setFilteredList(newPersonArray.filter((person) => person.name.includes(search)));
      console.log('Inside handelSearch: else [person]',person); 
    }
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
      <Filter search={search} handelSearch={handelSearch}/>
      <h3>add a new</h3>
      <PersonFrom newName={newName} newNumber={newNumber} handelNameChange={handelNameChange} handelNumberChange={handelNumberChange} addPerson={addPerson}/>
      <h3>Numbers</h3>
      <Person person={person} filteredList={filteredList} showAll={showAll}/>
      <br/>
      <div>Debug : {search}</div>
    </div>  
  )
}

export default App;

const Person = (props) => {
  const {person,filteredList,showAll} = props; 
  return (
    <div>{showAll? <Record person={person} /> : <Record person={filteredList} />}</div>
  )
}

const Record = ({person}) => {
  return (
    <div>{person.map((person) => <p key={person.id}>{person.name} : {person.number}</p>)}</div>
  )
}

const PersonFrom = (props) => {
  const { newName,newNumber,handelNameChange,handelNumberChange,addPerson } = props; 
  return(
    <form onSubmit={addPerson}>
        <div> name : <input id ="name" value={newName} onChange={handelNameChange}/> </div>
        <div> number : <input id="number" value={newNumber} onChange={handelNumberChange}/> </div>
        <div><button type="submit">add</button></div>
    </form>
  )
}

const Filter = (props) => {
  const { search,handelSearch } = props; 
  return(
    <div>
      filter shown with : <input id="search" value={search} onChange={handelSearch}/>
    </div>
  )
}


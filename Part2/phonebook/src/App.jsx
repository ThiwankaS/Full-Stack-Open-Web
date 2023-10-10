import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonFrom from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/person';


const App = () => {

  //State declarionts 
  const [ person,setPerson ] = useState([]); 
  const [ newName,setNewName ] = useState(''); 
  const [ newNumber,setNewNumber ] = useState('');
  const [ search,setSearch ] = useState(''); 
  const [ showAll,setShowAll ] = useState(true);  
  const [ filteredList,setFilteredList ] = useState([]); 

  //Importing data from the JSON server 
  useEffect(() => {
    personService.getAll().then(initialRecords => setPerson(initialRecords));
  },[]);
  
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
    } else {
      setSearch(event.target.value); 
      setShowAll(false); 
      const newPersonArray = person.slice();
      setFilteredList(newPersonArray.filter((person) => person.name.includes(search)));
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
      
      personService.createRecord(newPerson).then(record => {
        setPerson(person.concat(record)); 
        setNewName(''); 
        setNewNumber('');
      })
    }
  }

  const deleteRecordOf = (record) => {
    let confirmation = window.confirm(`Delete ${record.name} ?`); 
    if(confirmation){
      personService.deleteRecord(record).then(setPerson(person.filter(item => item.id !== record.id)));
    }
  }

  return (
    <div>
      <h2>Phone Book</h2>
      <Filter search={search} handelSearch={handelSearch}/>
      <h3>add a new</h3>
      <PersonFrom newName={newName} newNumber={newNumber} handelNameChange={handelNameChange} handelNumberChange={handelNumberChange} addPerson={addPerson}/>
      <h3>Numbers</h3>
      <Persons person={person} filteredList={filteredList} showAll={showAll} deleteRecord={deleteRecordOf}/>    
    </div>  
  )
}

export default App;








import { useState } from 'react'

const App = () => {

  const [ person,setPerson ] = useState([{name : 'Alto Hellas'}]); 
  const [ newName,setNewName ] = useState(''); 


  return (
    <div>
      <h2>Phone Book</h2>
  
      <form>
        <div> name : <input/> </div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
    </div>  
  )
}

export default App;

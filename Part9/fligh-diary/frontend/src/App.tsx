import { useState,useEffect } from 'react';
import { DiaryEntry, NewDiaryEntry } from './type';
import { getDairyEntries,createDairyEntries } from './controlls/dairyService';
import Entry from './component/Entry';
import NewEntry from './component/NewEntry';
import Display from './component/Display';
import axios from 'axios';



const App = () => {

  const [ dairyEntries,setDairyEntries ] = useState<DiaryEntry[]>([]);
  const [ errorMessage,setErrorMessage ] = useState('');

  const createNewEntry = async (object : NewDiaryEntry ) => {
    try {
      const data = await createDairyEntries(object);
      setDairyEntries(dairyEntries.concat(data));
    } catch (error : unknown) {
      if(axios.isAxiosError(error)) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage(`Unhandled error occured, ${error}`);
      }
    }
  }
  setTimeout(()=>{
    setErrorMessage('')
  },5000)

  useEffect(() => {
    getDairyEntries().then(data => setDairyEntries(data));
  },[]);
  return (<div>
      <Display error={errorMessage}/>
      <NewEntry addEntry={createNewEntry}/>
      {dairyEntries.map(entry => <Entry key={entry.id} entry={entry}/>)}
  </div>)
}

export default App;
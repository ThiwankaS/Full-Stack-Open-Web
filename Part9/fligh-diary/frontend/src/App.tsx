import { useState,useEffect } from 'react';
import { DiaryEntry, NewDiaryEntry } from './type';
import { getDairyEntries,createDairyEntries } from './controlls/dairyService';
import Entry from './component/Entry';
import NewEntry from './component/NewEntry';



const App = () => {

  const [ dairyEntries,setDairyEntries ] = useState<DiaryEntry[]>([]);

  const createNewEntry = (object : NewDiaryEntry ) => {
    createDairyEntries(object).then(data => setDairyEntries(dairyEntries.concat(data)));
  }

  useEffect(() => {
    getDairyEntries().then(data => setDairyEntries(data));
  },[]);
  return (<div>
      <NewEntry addEntry={createNewEntry}/>
      {dairyEntries.map(entry => <Entry key={entry.id} entry={entry}/>)}
  </div>)
}

export default App;
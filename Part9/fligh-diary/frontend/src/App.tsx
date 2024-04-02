import { useState,useEffect } from "react";
import { getDairyEntries } from "./controlls/dairyService";
import { DiaryEntry } from "./type";
import Entry from './component/Entry';

const App = () => {

  const [ dairyEntries,setDairyEntries ] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getDairyEntries().then(data => setDairyEntries(data));
  },[]);

  return (<div>
      {dairyEntries.map(entry => <Entry key={entry.id} entry={entry}/>)}
  </div>)
}

export default App;
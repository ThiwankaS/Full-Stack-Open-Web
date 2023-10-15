import React, { useEffect, useState } from "react";
import axios from 'axios'; 

const App = () => {

  const [ countries,setCountries ] = useState([]); 
  const [ listToShow,setListToShow ] = useState([]); 
  const [ value,setValue ] = useState('');
  const [ message,setMessag ] = useState(``); 

  const url = `https://restcountries.com/v3.1/all`;


  useEffect(() => {
    axios.get(url).then(response => setCountries(response.data)).catch(error => {
      console.log(`Error fetching data from the server`,error); 
    })

    const tempList = countries.filter(country => country.name.common.toLowerCase().includes(value.toLocaleLowerCase()));
    
    console.log(`Country list is ${tempList.length}`);
    if(tempList.length > 10){
      setMessag(`Too many matches, specify another filter`); 
    } else {
      setListToShow(tempList);
      setMessag('');
    }

  },[value]) 

  const handelChange = (event) => {
    setValue(event.target.value); 
  }

  return(
    <div>
      <h1>Country List</h1>
      <form>
            find countries : <input value={value} onChange={handelChange}/>
      </form>
      <br/>
      <p>{message}</p>
      <Record countryList={listToShow}/>
    </div>
  )
}

export default App; 

const Record = ({countryList}) => {

  const lineStyle = {
    fontSize : 16,
    margin : 0.8
  }

  return(
    countryList.map(country => <p style={lineStyle} key={country.name.common}>{country.name.common}</p>)
  )
}

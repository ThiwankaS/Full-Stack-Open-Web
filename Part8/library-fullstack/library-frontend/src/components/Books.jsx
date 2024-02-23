import { ALL_BOOKS } from '../assets/queries'
import { useQuery } from '@apollo/client'
import { useEffect,useState } from 'react'
import Filter from '../components/Filter'
import Display from '../components/Display'

const Books = (props) => {
    const result = useQuery(ALL_BOOKS)
    const [ books,setBooks ] = useState([])
    const [ filter,setFilter ] = useState('all genres')

    useEffect(()=>{
      if(result.data){
        setBooks(result.data.allBooks)
      }
    },[result.data])

    if (!props.show) {
      return null
    }
    return (
      <div>
        <h2>books</h2>
        <Display books={books} filter={filter} />
        <Filter books={books} setFilter={setFilter} /> 
      </div>
    )
  }
  
  export default Books
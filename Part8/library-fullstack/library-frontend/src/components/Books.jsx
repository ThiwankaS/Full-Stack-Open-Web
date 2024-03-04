import { ALL_BOOKS,ALL_GENRES } from '../assets/queries'
import { useQuery } from '@apollo/client'
import { useEffect,useState } from 'react'
import Filter from '../components/Filter'
import Display from '../components/Display'

const Books = (props) => {
    const defaultFilter = ['all genres']
    const result = useQuery(ALL_BOOKS)
    const allGenresList = useQuery(ALL_GENRES)
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
        <Filter genres={defaultFilter.concat(allGenresList.data.allGenre)} setFilter={setFilter} /> 
      </div>
    )
  }
  
  export default Books
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../assets/queries'
import { useEffect,useState } from 'react'

const Authors = (props) => {
  
  const  result = useQuery(ALL_AUTHORS)
  const [ authors,setAuthor ] = useState([]) 

  useEffect(()=>{
    if(result.data){
      setAuthor(result.data.allAuthors)
    }
  },[result.data])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
  
export default Authors
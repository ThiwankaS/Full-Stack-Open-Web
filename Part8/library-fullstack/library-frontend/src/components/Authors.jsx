import { useQuery,useMutation } from '@apollo/client'
import { ALL_AUTHORS,UPDATE_AUTHOUR } from '../assets/queries'
import { useEffect,useState } from 'react'

const Authors = (props) => {
  
  const  result = useQuery(ALL_AUTHORS)
  const [ authors,setAuthor ] = useState([])
  const [ name,setName ] = useState('')
  const [ year,setYear ] = useState('')
  const [ updateAuthor ] = useMutation(UPDATE_AUTHOUR,{
    refetchQueries : [{ query : ALL_AUTHORS }]
  })

  useEffect(()=>{
    if(result.data){
      setAuthor(result.data.allAuthors)
    }
  },[result.data])

  const submit = (event) => {
    event.preventDefault()
    updateAuthor({
      variables : { name,year }
    })
    setName('')
    setYear('')
  }

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
      <div>
        <h2>set birthyear</h2>
        <form onSubmit={submit}>
          <div>
            name : 
            <input name='name' value={name} type='text' onChange={({ target }) => setName(target.value)}/>
          </div>
          <div>
            birth year : 
            <input name='birthYear' value={year} type="number" onChange={({ target }) => setYear(parseInt(target.value))}/>
          </div>
          <button type='submit'>update author</button>
        </form>
      </div>
    </div>
  )
}
  
export default Authors
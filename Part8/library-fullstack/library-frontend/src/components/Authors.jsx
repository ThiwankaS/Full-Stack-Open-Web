import { useQuery,useMutation } from '@apollo/client'
import { ALL_AUTHORS,UPDATE_AUTHOUR } from '../assets/queries'
import { useEffect,useState } from 'react'
import Select from 'react-select'


const Authors = (props) => {

  const  result = useQuery(ALL_AUTHORS)
  const [ authors,setAuthor ] = useState([])
  const [ year,setYear ] = useState('')
  const [ selectedOption,setSelectedOption ] = useState(null)
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
    const name = selectedOption.value
    updateAuthor({
      variables : { name,year }
    })
    setSelectedOption(null)
    setYear('')
  }

  const constructOption = (authors) => {
    return authors.reduce((options,author) => {
      options.push({ value : author.name, label : author.name }) 
      return options
    }, [])
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
        <h2>set birth year</h2>
        <form onSubmit={submit}>
        <div>
            <Select 
                options={constructOption(authors)} 
                onChange={(option) => setSelectedOption(option)}
                placeholder={'Select author name ...'}
              />
          </div>
          <div style={{ padding : '5px' }}>
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
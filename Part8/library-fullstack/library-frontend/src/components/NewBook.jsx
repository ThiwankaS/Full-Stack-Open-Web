import { useState } from 'react'
import { useMutation,useSubscription } from '@apollo/client'
import { CREATE_BOOK,ALL_BOOKS,ALL_AUTHORS, ALL_GENRES,BOOK_ADDED } from '../assets/queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [ createBook ] = useMutation(CREATE_BOOK,{
    onError : (error) => {
      const message = error.graphQLErrors.map(e => e.message.join('/n'))
      console.log(`Error ${message}`)
    },
    update : (cache,response) => {
      cache.updateQuery({ query : ALL_BOOKS },({ allBooks }) => {
        console.log('author :',response.data.addBook.author)
        return {
          allBooks : allBooks.concat(response.data.addBook)
        }
      })
    },
    refetchQueries : [{ query : ALL_AUTHORS }, { query : ALL_GENRES }]
  })

  useSubscription(BOOK_ADDED,{
    onData : ({ data }) => {
      window.alert(`${data.data.bookAdded.title} added`)
    }
  })

  if (!props.show) {
    return null
  }
  
  const submit = async (event) => {
    event.preventDefault()

    createBook({
      variables : { title,author,published,genres }
    })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(parseInt(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
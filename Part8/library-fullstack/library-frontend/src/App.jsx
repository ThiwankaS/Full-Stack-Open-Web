import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { useApolloClient } from '@apollo/client'
import { BOOK_ADDED } from './assets/queries'

const App = () => {

  const [ page, setPage ] = useState('authors')
  const [ token,setToken ] = useState(null)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  
  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(()=>{
      setErrorMessage(null)
    },5000)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')}>login</button>
        {token ? 
            <>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={() => setPage('recommend')}>recommend</button>
              <button onClick={ logout }>logout</button>
            </>
             : null
        }
      </div>
      
      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} setError={notify}/>
      <LoginForm show={ page === 'login'} setToken={setToken} token={token} />
      <Recommend show={ page === 'recommend'} />
    </div>
  )
}

export default App
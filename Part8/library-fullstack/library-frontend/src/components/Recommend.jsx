import { useQuery } from '@apollo/client'
import { useEffect,useState } from 'react'
import { ME,ALL_BOOKS } from '../assets/queries'
import Display from './Display'

const Recommend = (props) => {

    const userResult = useQuery(ME)
    const bookResult = useQuery(ALL_BOOKS)
    const [ currentUser,setCurrentUser ] = useState(null)
    const [ books,setBooks ] = useState([])

    useEffect(() => {
        if(userResult.data){
            setCurrentUser(userResult.data.me)
            setBooks([].concat(bookResult.data.allBooks))
        }
    },[userResult.data])

    if(!props.show){
        return null
    }
    
    return (
        <div>
            <h2>recommendations</h2>
            <Display books={books} filter={currentUser.favoriteGenre} />
        </div>
    )
}

export default Recommend
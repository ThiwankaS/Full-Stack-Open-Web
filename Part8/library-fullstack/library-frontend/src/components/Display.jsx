import { useEffect,useState } from 'react'

const Display = ({ books,filter }) => {

    const [ bookList,setBookList ] = useState([])   

    const filteringBooks = (item,array) => {
        if(item === 'all genres'){
            return array
        }
        return array.filter(b => b.genres.includes(item))
    }

    useEffect(() => {
        setBookList(filteringBooks(filter,books))
    },[filter])

return (
        <div>
            <table>
                <tbody>
                    <tr>
                    <th>Book titile</th>
                    <th>Author</th>
                    <th>Published</th>
                    </tr>
                    {bookList.map((a) => (
                    <tr key={a.title}>
                        <td>{a.title}</td>
                        <td>{a.author.name}</td>
                        <td>{a.published}</td>
                    </tr>
                    ))}
                </tbody>
        </table>
        </div>
)
}

export default Display
const Filter = ({ genres,setFilter }) => {

    return (
        <div> 
            {genres.map(item => <button key={item} onClick={() => setFilter(item)}>{item}</button>)}
        </div>
    )
}

export default Filter
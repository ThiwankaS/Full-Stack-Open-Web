const Filter = ({ books,setFilter }) => {

    const genres = books.reduce((result,iterator) =>{
        if(result.length > 1){
          if(iterator.genres.length > 1){
            iterator.genres.map( a => {
              if(!result.includes(a)){
                result.push(a)
              }
            })
          } else {
            if(!result.includes(iterator.genres[0])){
              result.push(iterator.genres[0])
            }
          }
        } else {
          if(iterator.genres.length > 1){
            iterator.genres.map( a => result.push(a))
          } else {
            result.push(iterator.genres[0])
          }
        }
        return result
      },['all genres']) 

    return (
        <div> 
            {genres.map(item => <button key={item} onClick={() => setFilter(item)}>{item}</button>)}
        </div>
    )
}

export default Filter
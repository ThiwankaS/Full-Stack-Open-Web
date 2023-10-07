const Record = ({person}) => {
    return (
      <div>{person.map((person) => <p key={person.id}>{person.name} : {person.number}</p>)}</div>
    )
  } 

  export default Record; 
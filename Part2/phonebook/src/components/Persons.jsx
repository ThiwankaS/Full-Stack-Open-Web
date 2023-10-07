import Record from "./Record";

const Persons = (props) => {
    const {person,filteredList,showAll} = props; 
    return (
      <div>{showAll? <Record person={person} /> : <Record person={filteredList} />}</div>
    )
  }

  export default Persons; 
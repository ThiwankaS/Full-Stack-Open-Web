import { useState } from 'react';

const NewEntry = ({ addEntry }) => {
    
    const [ date,setDate ] = useState('');
    const [ weather,setWeather ] = useState('');
    const [ visibility,setVisibility ] = useState('');
    const [ comment,setComment ] = useState('');

    const handelAddEntry = (event : React.SyntheticEvent) => {
        event.preventDefault();
        const entry = {
            date,
            weather,
            visibility,
            comment
        };
        addEntry(entry);
    }
    
    return (
        <div>
            <h4> Add new entry</h4>
            <form onSubmit={handelAddEntry}>
                <div>
                    date : <input
                        name='date'
                        value={date}
                        type='text'
                        onChange={(event) => setDate(event.target.value)}
                    />
                </div>
                <div>
                    weather : <input
                        name='weather'
                        value={weather}
                        type='text'
                        onChange={(event) => setWeather(event.target.value)}
                    />
                </div>
                <div>
                    visibility : <input
                        name='visibility'
                        value={visibility}
                        type='text'
                        onChange={(event) => setVisibility(event.target.value)}
                    />
                </div>
                <div>
                    comment : <input
                        name='comment'
                        value={comment}
                        type='text'
                        onChange={(event) => setComment(event.target.value)}
                    />
                </div>
                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default NewEntry;
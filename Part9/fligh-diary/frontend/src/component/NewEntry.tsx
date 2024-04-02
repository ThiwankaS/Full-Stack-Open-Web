import { useState } from 'react';
import { Weather, Visibility, NewDiaryEntry } from '../type';
import toNewDiaryEntry from '../helper'; 

const NewEntry = ({ addEntry } : { addEntry : (newEntry : NewDiaryEntry ) => void }) => {
    
    const [ date,setDate ] = useState('');
    const [ weather,setWeather ] = useState<Weather>();
    const [ visibility,setVisibility ] = useState<Visibility>();
    const [ comment,setComment ] = useState('');

    const handelAddEntry = (event : React.SyntheticEvent) => {
        event.preventDefault();
        const entry = {
            date,
            weather,
            visibility,
            comment
        };
        addEntry(toNewDiaryEntry(entry));
    }

    const weatherFilter = (value : Weather ) => {
       setWeather(value);
    }

    const visibilityFilter = (value : Visibility ) => {
        setVisibility(value);
    }
    
    return (
        <div>
            <h4> Add new entry</h4>
            <form onSubmit={handelAddEntry}>
                <div>
                    date : <input
                        name='date'
                        value={date}
                        type='date'
                        onChange={(event) => setDate(event.target.value)}
                    />
                </div>
                <div>
                    Weather : 
                        Sunny <input type='radio' name='weatherFilter' onChange={() => weatherFilter(Weather.Sunny)} />
                        Rainy <input type='radio' name='weatherFilter' onChange={() => weatherFilter(Weather.Rainy)} />
                        Cloudy <input type='radio' name='weatherFilter' onChange={() => weatherFilter(Weather.Cloudy)} />
                        Stormy <input type='radio' name='weatherFilter' onChange={() => weatherFilter(Weather.Stormy)} />
                        Windy <input type='radio' name='weatherFilter' onChange={() => weatherFilter(Weather.Windy)} />
                </div>
                <div>
                    Visibility : 
                        Great <input type='radio' name='visibilityFilter' onChange={() => visibilityFilter(Visibility.Great)} />
                        Good <input type='radio' name='visibilityFilter' onChange={() => visibilityFilter(Visibility.Good)} />
                        Ok <input type='radio' name='visibilityFilter' onChange={() => visibilityFilter(Visibility.Ok)} />
                        Poor <input type='radio' name='visibilityFilter' onChange={() => visibilityFilter(Visibility.Poor)} />
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
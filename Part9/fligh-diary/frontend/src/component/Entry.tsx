import { DiaryEntry } from '../type'

const Entry = ({ entry } : { entry : DiaryEntry }) => {
    return <div>
        <h3>{ entry.date }</h3>
        <p>visibility : { entry.visibility }</p>
        <p>weather : { entry.weather }</p>
    </div>
}

export default Entry; 
import { DiaryEntry } from '../type'

const Entry = ({ entry } : { entry : DiaryEntry }) => {
    return <div>
        <h4>{ entry.date }</h4>
        <p>visibility : { entry.visibility }</p>
        <p>weather : { entry.weather }</p>
    </div>
}

export default Entry; 
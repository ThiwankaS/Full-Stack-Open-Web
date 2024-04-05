import { Entry } from '../../types';

interface Props{
    entry : Entry | undefined;
}

const DataView : React.FC<Props> = ({ entry }) => {
    return (
        <div>
            {entry?.date} <i>{entry?.description}</i>
            <ul>
            {entry?.diagnosisCodes?.map((item,index) => <li key={index}>{item}</li> )}
            </ul>
        </div>
    );
};

export default DataView;

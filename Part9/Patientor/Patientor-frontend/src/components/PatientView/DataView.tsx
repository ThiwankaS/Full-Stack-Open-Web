import { Entry,Diagnoses } from '../../types';

interface Props{
    entry : Entry | undefined;
    diagnoses : Diagnoses[];
}

const DataView : React.FC<Props> = ({ entry,diagnoses }) => {
    return (
        <div>
            {entry?.date} <i>{entry?.description}</i>
            <ul>
            {entry?.diagnosisCodes?.map((item,index) => <li key={index}>{item} {diagnoses.find(element => element.code === item)?.name}</li>)}
            </ul>
        </div>
    );
};

export default DataView;

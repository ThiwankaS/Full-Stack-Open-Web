import { Typography } from '@mui/material';
import { Entry,Diagnoses } from '../../types';
import DataView from './DataView';

interface Props{
    temp : Array<Entry> | undefined;
    diagnoses : Diagnoses[];
}

const EntryView : React.FC<Props> = ({temp,diagnoses }) => {

    return (
        <div>
            <Typography align="left" variant="h6">
                Entries
            </Typography>
            <br />
            { temp?.length === undefined || temp?.length > 0 ? (temp?.map((entry,index) => <DataView entry={entry} key={index} diagnoses={diagnoses}/>)) : <i>No etries to show</i> }
        </div>
    );
};

export default EntryView;
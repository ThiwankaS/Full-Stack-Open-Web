import { Typography } from '@mui/material';
import { Entry } from '../../types';
import DataView from './DataView';

interface Props{
    temp : Array<Entry> | undefined;
}

const EntryView : React.FC<Props> = ({temp}) => {

    return (
        <div>
            <Typography align="left" variant="h6">
                Entries
            </Typography>
            <br />
            { temp?.length === undefined || temp?.length > 0 ? (temp?.map((entry,index) => <DataView entry={entry} key={index}/>)) : <i>No etries to show</i> }
        </div>
    );
};

export default EntryView;
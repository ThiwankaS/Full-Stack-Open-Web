import { Typography,Table,TableRow,TableBody,TableCell } from '@mui/material';
import { Entry,Diagnoses } from '../../types';
import DataView from './DataView';
import AddEntryModal from '../AddEntryModal/index';

interface Props{
    temp : Array<Entry> | undefined;
    diagnoses : Diagnoses[];
    patientId : string;
}

const EntryView : React.FC<Props> = ({temp, diagnoses, patientId }) => {

    return (
        <div>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <Typography align="left" variant="h6">Entries</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <AddEntryModal patientID={patientId}/>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                        { temp?.length === undefined || temp?.length > 0 ? (temp?.map((entry,index) => <DataView entry={entry} key={index} diagnoses={diagnoses}/>)) : <i>No etries to show</i> }
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default EntryView;
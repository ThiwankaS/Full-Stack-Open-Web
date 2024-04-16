import { Typography,Table,TableRow,TableBody,TableCell } from '@mui/material';
import { Entry,Diagnoses } from '../../types';
import DataView from './DataView';
import AddEntryModal from '../AddEntryModal/index';
import { useState,useEffect } from 'react';

interface Props{
    medicalEntries : Array<Entry> | undefined;
    diagnoses : Diagnoses[];
    patientId : string;
}

const EntryView : React.FC<Props> = ({medicalEntries, diagnoses, patientId }) => {

    const[entries,setEntries] = useState<Array<Entry>>();

    useEffect(()=>{
        const fetchEntries = () => {
            setEntries(medicalEntries);
        };
        void fetchEntries ();
    }, [medicalEntries]); 

    const upDateEntires = (entry : Entry) => {
        setEntries(entries?.concat(entry));
    };

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
                            <AddEntryModal patientID={patientId} upDateEntries={upDateEntires} diagnoses={diagnoses}/>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                        { entries?.length === undefined || entries?.length > 0 ? (entries?.map((entry,index) => <DataView entry={entry} key={index} diagnoses={diagnoses}/>)) : <i>No etries to show</i> }
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default EntryView;
import { Table, TableCell, TableRow, TableBody, TableHead, Button, Dialog, DialogContent} from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { Diagnoses, Patient } from "../../types";
import EntryView from './EntryView';

interface Props {
    patient: Patient | undefined;
    diagnoses : Diagnoses[];
    show : boolean;
    onClose : () => void;
    patientId : string;
}

const PatientView : React.FC<Props> = ({ patient, show, onClose, diagnoses, patientId}) => {
    
    return (
        <div>
            {show && 
            <Dialog fullWidth={true} open={show}>
            <DialogContent>
                <Table style={{ marginBottom: "1em" }}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontSize: "1.5em" }}>{patient?.name}{patient?.gender === 'male' ? <MaleIcon /> : patient?.gender === 'female' ? <FemaleIcon /> : <TransgenderIcon />}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>ssn</TableCell>
                            <TableCell>{patient?.ssn}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>occupation</TableCell>
                            <TableCell>{patient?.occupation}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <EntryView temp={patient?.entries} diagnoses={diagnoses} patientId={patientId}/>
                <Button variant="contained" onClick={() => onClose()}>Close</Button>
            </DialogContent>
        </Dialog>}
        </div>
    );
};

export default PatientView;
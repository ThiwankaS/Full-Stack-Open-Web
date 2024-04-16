import { Button,Container } from '@mui/material';
import { useState } from 'react';
import AddEntryFrom from './AddEntryForm';
import patientService from "../../services/patients";
import { EntryWithoutId, Entry, Diagnoses } from "../../types";
import axios from 'axios';
import Alert from '@mui/material/Alert';

interface Props {
    patientID : string;
    upDateEntries : (value : Entry)  => void;
    diagnoses : Diagnoses[];
}

const AddEntryModal : React.FC<Props> = ({ patientID,upDateEntries,diagnoses }) => {

    const[formVisibility,setFormVisibility] = useState<boolean>(false);
    const[errorMessage,setErrorMessage] = useState<string>('');
    const[errorVisibility,setErrorVisibility] = useState<boolean>(false);

    const toggleFormVisibility = () => {
        setFormVisibility(!formVisibility);
    };

    

    const addNewMedicalEntry = async (object : EntryWithoutId, id : string) => {
        try {
            const newEntry = await patientService.createMedicalEntry(object,id);
            upDateEntries(newEntry);
        } catch (error : unknown) {
            if( axios.isAxiosError(error)){
                setErrorMessage(error.response?.data);
                setErrorVisibility(!errorVisibility);
            } else {
                setErrorMessage('Unexpected error occurred!');
                setErrorVisibility(!errorVisibility);
            }
        }
    };

    const ShowError = () => {
        return(
            <Alert severity="error">{errorMessage}</Alert>
        );
    };

    setTimeout(()=>{
        setErrorVisibility(false);
        setErrorMessage('');
    },3000);
    
    return(
        <Container sx={{ margin : 1 }}>
             {errorVisibility && <ShowError />}
            <Button 
                color="secondary"
                variant="contained"
                style={{ float: "left" }}
                type="button"
                onClick={toggleFormVisibility}
            >{formVisibility ? 'Cancel' : 'Add new entry'}</Button>
            { formVisibility &&   <AddEntryFrom patientID={patientID} onSubmit={addNewMedicalEntry} diagnoses={diagnoses}/> }
        </Container>
    );
};

export default AddEntryModal;

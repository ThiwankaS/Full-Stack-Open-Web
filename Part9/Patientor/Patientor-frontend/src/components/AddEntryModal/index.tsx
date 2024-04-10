import { Button,Container } from '@mui/material';
import { useState } from 'react';
import AddEntryFrom from './AddEntryForm';
import patientService from "../../services/patients";
import { EntryWithoutId } from "../../types";

interface Props {
    patientID : string;
}

const AddEntryModal : React.FC<Props> = ({ patientID }) => {

    const[formVisibility,setFormVisibility] = useState<boolean>(false);

    const toggleFormVisibility = () => {
        setFormVisibility(!formVisibility);
    };

    const addNewMedicalEntry = async (object : EntryWithoutId, id : string) => {
        const updatedPatient = await patientService.createMedicalEntry(object,id);
        console.log('Entry Created : ',updatedPatient);
    };
    
    return(
        <Container sx={{ margin : 1 }}>
            <Button 
                color="secondary"
                variant="contained"
                style={{ float: "left" }}
                type="button"
                onClick={toggleFormVisibility}
            >{formVisibility ? 'Cancel' : 'Add new entry'}</Button>
            { formVisibility &&   <AddEntryFrom patientID={patientID} onSubmit={addNewMedicalEntry}/> }
        </Container>
    );
};

export default AddEntryModal;

import { TextField,InputLabel,Select,MenuItem,Grid,Button,SelectChangeEvent } from '@mui/material';
import { useState,SyntheticEvent } from 'react';
import { Type,EntryWithoutId } from "../../types";

interface TypeOption {
    value: Type;
    label: string;    
}

interface Props {
    onSubmit: (values: EntryWithoutId, id : string) => void;
    patientID : string; 
}

const typeOptions: TypeOption[] = Object.values(Type).map(v => ({
    value: v, 
    label: v.toString()
  }));


const AddEntryFrom : React.FC<Props> = ({onSubmit, patientID }) => {
    const[date,setDate] = useState<string>('');
    const[specialist,setSpecialist] = useState<string>('');
    const[description,setDescription] = useState<string>('');
    const[diagnosisCodes,setDiagnosisCodes] = useState<string>('');
    const[type,setType] = useState<Type>(Type.Hospital);

    const addMedicalEntry = (event: SyntheticEvent) => {
        event.preventDefault();
        onSubmit({
            date : date,
            specialist : specialist,
            description : description,
            diagnosisCodes : ['S62.5'],
            type : Type.Hospital,
            discharge : {
                date : '2024-04-09',
                criteria : 'Fully recovered'
            }
        },patientID);
    };

    const onTypechange = (event: SelectChangeEvent<Type>) => {
        const selectedOption = event.target.value as Type;
        setType(selectedOption);
    };

    return (
        <div>      
        <form onSubmit={addMedicalEntry}>
            <TextField
                label="Date"
                placeholder="YYYY-MM-DD"
                fullWidth
                value={date}
                onChange={({ target }) => setDate(target.value)}
            />
            <TextField
                label="Specialist"
                fullWidth
                value={specialist}
                onChange={({ target }) => setSpecialist(target.value)}
            />
            <TextField
                label="Description"
                fullWidth 
                value={description}
                onChange={({ target }) => setDescription(target.value)}
            />
            <TextField
                label="Diagnosis Codes"
                fullWidth
                value={diagnosisCodes}
                onChange={({ target }) => setDiagnosisCodes(target.value)}
            />

            <InputLabel style={{ marginTop: 20 }}>Type</InputLabel>
                <Select
                    label="Type"
                    fullWidth
                    value={type}
                    onChange={onTypechange}
                >
                    {typeOptions.map(option =>
                        <MenuItem
                            key={option.label}
                            value={option.value}
                        >
                            {option.label}
                        </MenuItem>
                    )}
                </Select>

            <Grid>
                <Grid item>
                    <Button
                        style={{
                            float: "right",
                        }}
                        type="submit"
                        variant="contained"
                    >
                    Add
                    </Button>
                </Grid>
            </Grid>
            </form>
        </div>
    );
};

export default AddEntryFrom;
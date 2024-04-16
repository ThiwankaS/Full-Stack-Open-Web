import { TextField,InputLabel,Select,MenuItem,Grid,Button,SelectChangeEvent,Alert } from '@mui/material';
import { useState,SyntheticEvent } from 'react';
import { Type,EntryWithoutId,Diagnoses } from "../../types";
import DiagnosisCode from './DiagnosisCode';
import { HealthCheckRating } from "../../types";

interface TypeOption {
    value: Type;
    label: string;    
}

interface DiagnosesCodeOption {
    value: Diagnoses['code'];
    label: string;    
}

interface RatingOption {
    value: number;
    label: string;
}

interface Props {
    onSubmit: (values: EntryWithoutId, id : string) => void;
    patientID : string;
    diagnoses : Diagnoses[];
}

const typeOptions: TypeOption[] = Object.values(Type).map(v => ({
    value: v, 
    label: v.toString()
}));

const ratingOptions: RatingOption[] = [
    {
        value: 0,
        label: "Healthy"
    },{
        value: 1,
        label: "Low Risk"
    },{
        value: 2,
        label: "High Risk"
    },{
        value: 3,
        label: "Critical Risk"
    }
];


const AddEntryFrom : React.FC<Props> = ({onSubmit,patientID,diagnoses }) => {
    const[date,setDate] = useState<string>('');
    const[specialist,setSpecialist] = useState<string>('');
    const[description,setDescription] = useState<string>('');
    const[diagnosisCodes,setDiagnosisCodes] = useState<Array<Diagnoses['code']>>([]);
    const[type,setType] = useState<Type>(Type.Hospital);
    const[rating,setRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
    const[employerName,setEmployerName] = useState<string>('');
    const[startDate,setStartDate] = useState<string>('');
    const[endDate,setEndDate] = useState<string>('');
    const[dischargeDate,setDischargeDate] = useState<string>('');
    const[criteria,setCriteria] = useState<string>('');

    const addMedicalEntry = (event: SyntheticEvent) => {
        event.preventDefault();
        switch(type){
            case(Type.Hospital):{
                onSubmit({
                    date : date,
                    specialist : specialist,
                    description : description,
                    diagnosisCodes : diagnosisCodes,
                    type : type,
                    discharge : {
                        date : dischargeDate,
                        criteria : criteria
                    }
                },patientID);
            } break;
            case(Type.HealthCheck):{
                onSubmit({
                    date : date,
                    specialist : specialist,
                    description : description,
                    diagnosisCodes : diagnosisCodes,
                    type : type,
                    healthCheckRating : rating,
                },patientID);
            } break;
            case(Type.OccupationalHealthcare):{
                onSubmit({
                    date : date,
                    specialist : specialist,
                    description : description,
                    diagnosisCodes : diagnosisCodes,
                    type : type,
                    employerName : employerName,
                    sickLeave : {
                        startDate : startDate,
                        endDate : endDate
                    }
                },patientID);
            } break;
        }
        clearFileds();
    };

    const clearFileds = () => {
        setDate('');
        setSpecialist('');
        setDescription('');
        setDiagnosisCodes([]);
        setType(Type.Hospital);
        setRating(HealthCheckRating.Healthy);
        setEmployerName('');
        setStartDate('');
        setEndDate('');
        setDischargeDate('');
        setCriteria('');
    };

    const onTypeChange = (event: SelectChangeEvent<Type>) => {
        const selectedOption = event.target.value as Type;
        setType(selectedOption);
    };

    const onRatingChange = (event : SelectChangeEvent<HealthCheckRating>) => {
        const selectedRating = event.target.value as HealthCheckRating;
        setRating(selectedRating);
    };

    const codeOptions: DiagnosesCodeOption[] = diagnoses.map(v => ({
        value: v.code, 
        label: v.code.toString()
    }));

    const ShowCodes = () => (
        <>
            {diagnosisCodes.length > 0 && <Alert severity="success">{`Diagnosis codes suceesfully added : ${diagnosisCodes}`}</Alert>}
        </>
    );

    return (
        <div>      
            <form onSubmit={addMedicalEntry}>
                <TextField
                    type="date"
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
                <DiagnosisCode  setDiagnosisCodes={setDiagnosisCodes} codeOptions={codeOptions}/>
                <ShowCodes />
                <InputLabel style={{ marginTop: 20 }}>Type</InputLabel>
                    <Select
                        label="Type"
                        fullWidth
                        value={type}
                        onChange={onTypeChange}
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
                    { type === Type.HealthCheck && (
                        <>
                            <InputLabel style={{ marginTop: 20 }}>Health Check Rating</InputLabel>     
                            <Select
                                label="Rating"
                                fullWidth
                                value={rating}
                                sx={{ visibility : type === Type.HealthCheck ? 'show' : 'hidden'}}
                                onChange={onRatingChange}
                            >
                                {ratingOptions.map(option =>
                                    <MenuItem
                                        key={option.label}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </MenuItem>
                                )}
                            </Select>
                        </>
                    )}
                    { type === Type.OccupationalHealthcare && (
                        <>
                            <TextField
                            label="Employer Name"
                            fullWidth
                            value={employerName}
                            onChange={({ target }) => setEmployerName(target.value)}
                            sx={{ paddingTop : 1}}
                            />
                            <InputLabel style={{ marginTop: 20 }}>Sick Leave Infomation</InputLabel>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <InputLabel > Start Date : </InputLabel> 
                                    <TextField
                                        type="date"
                                        value={startDate}
                                        onChange={({ target }) => setStartDate(target.value)}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <InputLabel > End Date : </InputLabel>
                                    <TextField
                                        type="date"
                                        value={endDate}
                                        onChange={({ target }) => setEndDate(target.value)}
                                    />
                                </Grid>
                            </Grid>
                        </>
                    )}
                    { type === Type.Hospital && (
                        <>
                            <InputLabel > Discharged Date : </InputLabel> 
                            <TextField
                                type="date"
                                value={dischargeDate}
                                onChange={({ target }) => setDischargeDate(target.value)}
                            />
                            <TextField
                                label="Criteria"
                                fullWidth
                                value={criteria}
                                onChange={({ target }) => setCriteria(target.value)}
                            />
                        </>
                    )}
                    <Grid>
                        <Grid item sx={{ paddingTop : 1}}>
                            <Button
                                style={{
                                    float: "right",
                                }}
                                type="submit"
                                variant="contained"
                            >
                            Add Medical Entry
                            </Button>
                        </Grid>
                    </Grid>
                </form>
        </div>
    );
};

export default AddEntryFrom;
import { Entry,Diagnoses,OccupationalHealthcareEntry } from '../../types';
import { Container } from '@mui/material';
import MedicalServicesSharpIcon from '@mui/icons-material/MedicalServicesSharp';

interface Props {
    entry : Entry | undefined;
    diagnoses : Diagnoses[];
}

const OccupationalHealthcareTypeEntry : React.FC<Props & { entry: OccupationalHealthcareEntry }> = ({ entry,diagnoses }) => {
    return (
            <Container sx={{ border : 1 , margin : 1, borderRadius : 1 }}>
                <div>{entry?.date} <MedicalServicesSharpIcon /> {entry?.employerName}</div>
                <div><i>{entry?.description}</i></div>
                <p style={{ fontSize : '0.8rem' }}>Diagnosed by {entry?.specialist}</p>
                    <ul>
                    {entry?.diagnosisCodes?.map(item => ( 
                            <li key={item}>
                                    {`${item} ${diagnoses.find(element => element.code === item)?.name}`}
                            </li> 
                    ))}
                    </ul>   
        </Container>
    );
};

export default OccupationalHealthcareTypeEntry;
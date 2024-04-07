    import { Entry,Diagnoses,HospitalEntry } from '../../types';
    import { Container } from '@mui/material';
    import LocalHospitalSharpIcon from '@mui/icons-material/LocalHospitalSharp';

    interface Props {
        entry : Entry | undefined;
        diagnoses : Diagnoses[];
    }

    const HospitalTypeEntry : React.FC<Props & {entry : HospitalEntry }> = ({ entry,diagnoses }) => {
        return (
                <Container sx={{ border : 1 , margin : 1, borderRadius : 1 }}>
                    <div>{entry?.date} <LocalHospitalSharpIcon /></div>
                    <div><i>{entry?.description}</i></div>
                    <p style={{ fontSize : '0.9rem' }}>Discharged date : {entry?.discharge.date}</p>
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

    export default HospitalTypeEntry;
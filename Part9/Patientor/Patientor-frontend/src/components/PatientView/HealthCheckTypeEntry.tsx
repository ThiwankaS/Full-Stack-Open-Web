import { Entry,Diagnoses,HealthCheckEntry } from '../../types';
import { Container } from '@mui/material';
import MonitorHeartSharpIcon from '@mui/icons-material/MonitorHeartSharp';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp'; 


interface Props {
    entry : Entry | undefined;
    diagnoses : Diagnoses[];
}

const HealthCheckTypeEntry : React.FC<Props & { entry : HealthCheckEntry }> = ({ entry,diagnoses }) => {
    return (
            <Container sx={{ border : 1 , margin : 1, borderRadius : 1 }}>
                <div>{entry?.date} <MonitorHeartSharpIcon /></div>
                <div><i>{entry?.description}</i></div>
                    <div>
                        { entry?.healthCheckRating === 0 
                            ? <FavoriteSharpIcon sx={{ color: 'green' }}/>
                            : entry?.healthCheckRating === 1 
                                ? <FavoriteSharpIcon sx={{ color: 'yellow' }} />
                                : entry?.healthCheckRating === 2
                                    ? <FavoriteSharpIcon sx={{ color: 'orange' }} />
                                    : <FavoriteSharpIcon sx={{ color: 'red' }} />
                        }
                    </div>
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

export default HealthCheckTypeEntry;

//import MedicalServicesSharpIcon from '@mui/icons-material/MedicalServicesSharp'; - OccupationalHelath Icon
//import LocalHospitalSharpIcon from '@mui/icons-material/LocalHospitalSharp'; - Hospital Icon
//import MonitorHeartSharpIcon from '@mui/icons-material/MonitorHeartSharp'; - HelathChekup Icon
//import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp'; - Heart
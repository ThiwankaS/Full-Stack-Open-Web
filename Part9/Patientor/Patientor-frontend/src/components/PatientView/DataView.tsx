import { Entry,Diagnoses } from '../../types';
import HospitalTypeEntry from './HospitalTypeEntry';
import OccupationalHealthcareTypeEntry from './OccupationalHealthcareTypeEntry';
import HealthCheckTypeEntry from './HealthCheckTypeEntry';
import { assertNever } from '../../helper';

interface Props {
    entry : Entry | undefined;
    diagnoses : Diagnoses[];
}

const DataView : React.FC<Props> = ({ entry,diagnoses }) => {
   switch(entry?.type){
    case "Hospital":
        return <HospitalTypeEntry entry={entry} diagnoses={diagnoses}/>;
    case "OccupationalHealthcare":
        return <OccupationalHealthcareTypeEntry entry={entry} diagnoses={diagnoses}/>;
    case "HealthCheck":
        return <HealthCheckTypeEntry entry={entry} diagnoses={diagnoses}/>;
    default: 
        return assertNever(entry);
   }
};

export default DataView;
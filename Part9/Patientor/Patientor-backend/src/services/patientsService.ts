import patientsData from '../data/patients';
import { Patients,NonSensitivePatientEntries } from '../types';

const patients : Patients[] = patientsData;

const getPatientsEntries = () : Patients[] => {
    return patients;
};

const getNonSensitivePatientEntries = () : NonSensitivePatientEntries[] => {
    return patients.map(({ id,name,dateOfBirth,gender,occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

export default {
    getPatientsEntries,
    getNonSensitivePatientEntries
};
import patientsData from '../data/patients';
import { Patients,NonSensitivePatientEntries,NewPatientEntry } from '../types';
import { v4 as uuidv4 } from 'uuid';

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

const addNewPatientEntry = (newPatient : NewPatientEntry ) : Patients => {
    const newEntry : Patients = { id : uuidv4(), ...newPatient};
    patients.concat(newEntry);
    return newEntry;
};

export default {
    getPatientsEntries,
    getNonSensitivePatientEntries,
    addNewPatientEntry
};
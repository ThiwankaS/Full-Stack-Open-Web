import patientsData from '../data/patients';
import { Patient,NonSensitivePatientEntries,NewPatientEntry } from '../types';
import { v4 as uuidv4 } from 'uuid';

const patients : Patient [] = patientsData;

const getPatientsEntries = () : Patient[] => {
    return patients;
};

const getPatientByID = (id : string) : Patient | undefined => {
    return patientsData.find(person => person.id === id);
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

const addNewPatientEntry = (newPatient : NewPatientEntry ) : Patient => {
    const newEntry : Patient = { id : uuidv4(), ...newPatient};
    patients.concat(newEntry);
    return newEntry;
};

export default {
    getPatientsEntries,
    getNonSensitivePatientEntries,
    addNewPatientEntry,
    getPatientByID
};
import patientsData from '../data/patients';
import { Patient,NonSensitivePatientEntries,NewPatientEntry,EntryWithoutId,Entry } from '../types';
import { v4 as uuidv4 } from 'uuid';

let patients : Patient [] = patientsData;

const getPatientsEntries = () : Patient[] => {
    return patients;
};

const getPatientByID = (id : string) : Patient | undefined => {
    return patients.find(person => person.id === id);
};

const getNonSensitivePatientEntries = () : NonSensitivePatientEntries[] => {
    return patients.map(({ id,name,dateOfBirth,gender,occupation,entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};

const addNewPatientEntry = (newPatient : NewPatientEntry ) : Patient => {
    const newEntry : Patient = { id : uuidv4(), ...newPatient};
    patients = patients.concat(newEntry);
    return newEntry;
};

const addMedicalEntry = (id : string ,newEntry : EntryWithoutId) : Entry | undefined => {
    const newMedicalEntry : Entry = { id : uuidv4(),...newEntry};
    const selectedPatient = patients.find(element => element.id === id);
    if (!selectedPatient) {
        return undefined;
    }
    const updatedPatient = {...selectedPatient,entries : selectedPatient?.entries.concat(newMedicalEntry)};
    patients = patients.map(element => element.id !== id ? element : updatedPatient);
    return newMedicalEntry;
};

export default {
    getPatientsEntries,
    getNonSensitivePatientEntries,
    addNewPatientEntry,
    getPatientByID,
    addMedicalEntry
};
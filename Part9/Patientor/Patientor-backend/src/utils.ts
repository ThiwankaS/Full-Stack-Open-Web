import { NewPatientEntry,Gender,Entry,EntryWithoutId,Diagnoses,Type,HealthCheckRating,SickLeave,Discharge } from "./types";
import { codes } from "./data/diagnoses";

const toNewPatientEntry = (object : unknown) : NewPatientEntry => {
    if( !object || typeof object !== 'object'){
        throw new Error('Incorrect or missing required data in patient entry!');
    }
    if( 'name' in object && 'ssn' in object && 'dateOfBirth' in object && 'occupation' in object && 'gender' in object && 'entries' in object){
        const newEntry : NewPatientEntry = {
            name : parseName(object.name),
            ssn : parseSsn(object.ssn),
            dateOfBirth : parseDate(object.dateOfBirth),
            occupation : parseOccupation(object.occupation),
            gender : parseGender(object.gender),
            entries : parseEntries(object.entries)
        };
        return newEntry;
    }
    throw new Error('Incorrect data in patient entry : some fileds are missing!');
};

export default toNewPatientEntry;

export const toNewMedicalEntry = (object : unknown) : EntryWithoutId => {
    if(!object || typeof object !== 'object' || !('diagnosisCodes' in object)){
        throw new Error('Incorrect or missing required data in medical entry!');
    }
    if('date' in object && 'specialist' in object && 'description' in object && 'diagnosisCodes' in object && 'type' in object){
        if('healthCheckRating' in object){
            const basicEntry = {
                date : parseDate(object.date),
                specialist : parseSpecialist(object.specialist),
                description : parseDescription(object.description),
                diagnosisCodes : parseDiagnosisCodes(object.diagnosisCodes),
                type : parseType(object.type),
                healthCheckRating : parseHealthCheckRating(object.healthCheckRating)
            };
            return basicEntry;
        }
        if('employerName' in object && 'sickLeave' in object){
            const basicEntry = {
                date : parseDate(object.date),
                specialist : parseSpecialist(object.specialist),
                description : parseDescription(object.description),
                diagnosisCodes : parseDiagnosisCodes(object.diagnosisCodes),
                type : parseType(object.type),
                employerName : parseEmployerName(object.employerName),
                sickLeave : parseSickLeave(object.sickLeave),
            };
            return basicEntry;
        }
        if('discharge' in object){
            const basicEntry = {
                date : parseDate(object.date),
                specialist : parseSpecialist(object.specialist),
                description : parseDescription(object.description),
                diagnosisCodes : parseDiagnosisCodes(object.diagnosisCodes),
                type : parseType(object.type),
                discharge : parseDischarge(object.discharge)
            };
            return basicEntry;
        }
    }
    throw new Error('Incorrect data  in medical entry : some fileds are missing!');
};

const parseName = (name : unknown) : string => {
    if( !isString(name) ){
        throw new Error('Incorrect or missing name!');
    }
    return name;
};

const parseSsn = (ssn : unknown) : string => {
    if(!isString(ssn)) {
        throw new Error('Incorrect or missing ssn!');
    }
    return ssn;
};

const parseDate = (dateOfBirth : unknown): string => {
    if(!isString(dateOfBirth) || !isDate(dateOfBirth)){
        throw new Error('Incorrect or missing date Of Birth!');
    }
    return dateOfBirth; 
};

const parseOccupation = (occupation : unknown) : string => {
    if(!isString(occupation)){
        throw new Error('Incorrect or missing doccupation!');
    }
    return occupation;
};

const parseGender = (gender : unknown) : Gender => {
    if(!isString(gender) || !isGender(gender)){
        throw new Error('Incorrect or missing gender!');
    }
    return gender; 
};

const parseEntries = (entries : unknown) : Array<Entry> => {
    if(!Array.isArray(entries)) {
        throw new Error('Incorrect or missing types in entries!');
    }
    return entries as Array<Entry>;
};

const parseSpecialist = (specialist : unknown) : string => {
    if(!isString(specialist)){
        throw new Error('Incorrect or missing specialist!');
    }
    return specialist;
};

const parseDescription = (description : unknown) : string => {
    if(!isString(description)){
        throw new Error('Incorrect or missing description!');
    }
    return description;
};

const parseDiagnosisCodes = (diagnosisCodes : unknown) : Array<Diagnoses['code']> => {
    if(!Array.isArray(diagnosisCodes) || !isCodes(diagnosisCodes as Array<string>)) {
        throw new Error('Incorrect or missing Diagnosis Codes in entries!');
    }
    return diagnosisCodes as Array<Diagnoses['code']>;
};

const parseType = (type : unknown) : Type => {
    if(!isString(type)){
        throw new Error('Incorrect or missing types in entries!');
    }
    return type as Type;
};

const parseHealthCheckRating = (healthCheckRating : unknown) : HealthCheckRating => {
    if(!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)){
        throw new Error('Incorrect or missing Health Check Rating in entries!');
    }
    return healthCheckRating; 
};

const parseEmployerName = (employerName : unknown) : string => {
    if(!isString(employerName)){
        throw new Error('Incorrect or missing Employer Name!');
    }
    return employerName;
};

const parseSickLeave = (sickLeave : unknown) : SickLeave => {
    if(!sickLeave || typeof sickLeave !== 'object' || !('startDate' in sickLeave) || !('endDate' in sickLeave) || !isString(sickLeave.startDate) || !isString(sickLeave.endDate) || !isDate(sickLeave.startDate) || !isDate(sickLeave.endDate)){
        throw new Error('Incorrect or missing sick leave data!');
    }
    return sickLeave as SickLeave;
};

const parseDischarge = (discharge : unknown) : Discharge => {
    if(!discharge || typeof discharge !== 'object' || !('date' in discharge) || !('criteria' in discharge) || !isString(discharge.date) || isDate(discharge.date) || isString(discharge.criteria)){
        throw new Error('Incorrect or missing discharge data!');
    }
    return discharge as Discharge;
};

const isString = (text : unknown) : text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date : string) : boolean => {
    return Boolean(Date.parse(date));
};

const isNumber = (digit : unknown) : digit is number => {
    return typeof digit === 'number' || digit instanceof Number;
};

const isGender = (param : string) : param is Gender => {
    return Object.values(Gender).map( v => v.toString()).includes(param);
};

const isCodes = (param : Array<string>) : boolean => {
    return param.every(item => codes.includes(item));
};

const isHealthCheckRating = (param : number) : param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
};
import { NewPatientEntry,Gender,Entry} from "./types";

const toNewPatientEntry = (object : unknown) : NewPatientEntry => {
    if( !object || typeof object !== 'object'){
        throw new Error('Incorrect or missing required data!');
    }
    if( 'name' in object && 'ssn' in object && 'dateOfBirth' in object && 'occupation' in object && 'gender' in object && 'entries' in object){
        const newEntry : NewPatientEntry = {
            name : parseName(object.name),
            ssn : parseSsn(object.ssn),
            dateOfBirth : parseBithDay(object.dateOfBirth),
            occupation : parseOccupation(object.occupation),
            gender : parseGender(object.gender),
            entries : parseEntries(object.entries)
        };
        return newEntry;
    }
    throw new Error('Incorrect data : some fileds are missing!');
};

export default toNewPatientEntry;

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

const parseBithDay = (dateOfBirth : unknown): string => {
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
    if(!Array.isArray(entries) || !isType(entries as Array<Entry>)) {
        throw new Error('Incorrect or missing types in entries!');
    }
    return entries as Array<Entry>;
};

const isString = (text : unknown) : text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date : string) : boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (param : string) : param is Gender => {
    return Object.values(Gender).map( v => v.toString()).includes(param);
};

const isType = (param : Array<Entry>) : boolean => {
    const validTypes = ["HealthCheck","OccupationalHealthcare","Hospital"];
    return param.every(entry => validTypes.includes(entry.type));
};